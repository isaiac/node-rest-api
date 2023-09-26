const validateRequest = require('../request');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['login', 'password'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    login: {
      exists: true,
      notEmpty: true,
      isString: true,
      isLength: {
        options: { max: 255 }
      }
    },
    password: {
      exists: true,
      notEmpty: true,
      isString: true,
      isLength: {
        options: { max: 255 }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
