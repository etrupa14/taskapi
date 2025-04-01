require('dotenv').config();
const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const errorHandler = require('./middleware/errorHandler');
const createError = require('./utils/createError');

app.use(express.json()); 

app.get('/', (req, res) => {
  res.status(200).json({ message: 'It works!' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/tasks', taskRoutes);

// Fallback
app.use((req, res, next) => {
  const error = createError('Route Not found', 404);
  next(error);
});

app.use(errorHandler)

if (require.main === module) {
  const PORT = process.env.DEV_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
