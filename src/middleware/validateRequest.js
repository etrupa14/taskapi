const createError = require('../utils/createError');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return next(createError(messages.join(', '), 422));
    }

    next();
  };
};

module.exports = validateRequest;
