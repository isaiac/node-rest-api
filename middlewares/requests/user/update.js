const validateRequest = require('../request');

const Permission = require('../../../models/permission');
const Role = require('../../../models/role');
const User = require('../../../models/user');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = [
  'name',
  'email',
  'username',
  'password',
  'password_confirmation',
  'is_active',
  'roles',
  'permissions'
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
      optional: true,
      notEmpty: true,
      isEmail: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      unique: {
        custom: async (value, { req: request }) => {
          const { user } = request.params;

          if (await User.isEmailAlreadyTaken(value, user.id)) {
            throw new Error();
          }
        }
      }
    },
    username: {
      optional: true,
      notEmpty: true,
      isString: { bail: true },
      isLength: {
        options: { min: 3, max: 255 }
      },
      unique: {
        custom: async (value, { req: request }) => {
          const { user } = request.params;

          if (await User.isUsernameAlreadyTaken(value, user.id)) {
            throw new Error();
          }
        }
      }
    },
    password: {
      optional: true,
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
    },
    is_active: {
      optional: true,
      isBoolean: true
    },

    roles: {
      optional: true,
      isArray: true
    },
    'roles.*': {
      isSlug: { bail: true },
      existsIn: {
        custom: async (value) => {
          if (!(await Role.findByPk(value))) {
            throw new Error();
          }
        }
      }
    },
    permissions: {
      optional: true,
      isArray: true
    },
    'permissions.*': {
      isSlug: { bail: true },
      existsIn: {
        custom: async (value) => {
          if (!(await Permission.findByPk(value))) {
            throw new Error();
          }
        }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
