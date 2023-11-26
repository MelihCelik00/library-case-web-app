const Joi = require('joi');
const schemaValidator = require('../../utils/schemaValidator');

const validateId = (req, res, next) => {
  const schema = Joi.object({
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  });
  schemaValidator.validate(req, next, schema);
};

const validatePostIds = (req, res, next) => {
  console.log('validate');
  const schema = Joi.object({
    params: Joi.object({
      userId: Joi.number().integer().required(),
      bookId: Joi.number().integer().required(),
    }),
  });
  schemaValidator.validate(req, next, schema);
};

const validateReturnBody = (req, res, next) => {
  const schema = Joi.object({
    body: Joi.object({
      score: Joi.number().min(0).max(10).required(),
    }),
  });
  schemaValidator.validate(req, next, schema);
};

const validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    body: Joi.object({
      name: Joi.string().trim().min(1).max(100).required(),
    }),
  });
  schemaValidator.validate(req, next, schema);
};


module.exports = {
  validateId,
  validatePostIds,
  validateReturnBody,
  validateCreateUser,
};
