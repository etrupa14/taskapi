const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const errorHandler = require('./middleware/errorHandler');

// ✅ Load .env only in local/dev mode
if (process.env.IS_OFFLINE || process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// ✅ Log all incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Test root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

// ✅ Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Main task routes
app.use('/api/tasks', taskRoutes);

// ✅ Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// ✅ Centralized error handler
app.use((err, req, res, next) => {
  console.error('🔥 Internal Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Only run dev server if not running in Lambda
if (require.main === module) {
  const PORT = process.env.DEV_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
