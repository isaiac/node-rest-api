const validateRequest = require('../request');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['token', 'password', 'password_confirmation'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    token: {
      exists: true,
      notEmpty: true,
      isString: true
    },
    password: {
      exists: true,
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 6, max: 20 }
      }
    },
    password_confirmation: {
      passwordConfirmation: {
        custom: (value, { req: request }) => value === request.body.password
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
