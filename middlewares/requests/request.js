const { pick } = require('lodash');

const { sendUnprocessableEntity } = require('../http-responses');

const getErrors = (results) => {
  const errors = {};

  results.forEach((result) => {
    result.array().forEach(({ msg, path }) => {
      if (!errors[path]) {
        errors[path] = [];
      }

      errors[path].push(msg);
    });
  });

  return errors;
};

module.exports =
  (validationSchema, requestFields = []) =>
  async (req, res, next) => {
    if (Array.isArray(requestFields) && requestFields.length > 0) {
      req.body = pick(req.body, requestFields);
    }

    const errors = getErrors(await validationSchema.run(req));

    if (!Object.keys(errors).length) {
      return next();
    }

    req.errors = errors;

    return sendUnprocessableEntity(req, res);
  };
