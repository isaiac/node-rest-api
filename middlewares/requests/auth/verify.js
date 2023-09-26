const validateRequest = require('../request');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['token'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    token: {
      exists: true,
      notEmpty: true,
      isString: true
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
