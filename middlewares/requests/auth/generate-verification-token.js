const validateRequest = require('../request');

const User = require('../../../models/user');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['email'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    email: {
      exists: true,
      notEmpty: true,
      isEmail: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      existsIn: {
        custom: async (value) => {
          if (!(await User.isEmailAlreadyTaken(value))) {
            throw new Error();
          }
        },
        bail: true
      },
      unverifiedEmail: {
        custom: async (value) => {
          const user = await User.findByEmail(value);

          if (!user || user.isVerified()) {
            throw new Error();
          }
        }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
