const Joi = require('joi');
const schemaValidator = require('../../utils/schemaValidator');

const validateId = (req, res, next) => {
  const schema = Joi.object({
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  });
  schemaValidator.validate(req, next, schema);
};

const validateCreateBook = (req, res, next) => {
  const schema = Joi.object({
    body: Joi.object({
      name: Joi.string().min(1).max(100).required(),
    }),
  });
  schemaValidator.validate(req, next, schema);
};

module.exports = {
  validateId,
  validateCreateBook,
};
