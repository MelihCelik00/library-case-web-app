const validate = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  // eslint-disable-next-line no-unused-vars
  const {error, value} = schema.validate(req, options);
  if (error) {
    // eslint-disable-next-line max-len
    next({message: `Validation error: ${error.details.map((x) => x.message).join(', ')}`, status: 400});
  } else {
    next();
  }
};

module.exports = {
  validate,
};
