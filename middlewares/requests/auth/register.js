const validateRequest = require('../request');

const User = require('../../../models/user');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = [
  'name',
  'email',
  'username',
  'password',
  'password_confirmation'
];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    name: {
      optional: {
        options: { nullable: true }
      },
      isString: true,
      isLength: {
        options: { max: 255 }
      }
    },
    email: {
      exists: true,
      notEmpty: true,
      isEmail: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      unique: {
        custom: async (value) => {
          if (await User.isEmailAlreadyTaken(value)) {
            throw new Error();
          }
        }
      }
    },
    username: {
      exists: true,
      notEmpty: true,
      isString: { bail: true },
      isLength: {
        options: { min: 3, max: 255 }
      },
      unique: {
        custom: async (value) => {
          if (await User.isUsernameAlreadyTaken(value)) {
            throw new Error();
          }
        }
      }
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
