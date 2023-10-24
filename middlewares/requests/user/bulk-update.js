const validateRequest = require('../request');

const Permission = require('../../../models/permission');
const Role = require('../../../models/role');
const User = require('../../../models/user');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['data'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    data: {
      exists: true,
      isArray: true
    },
    'data.*.id': {
      exists: true,
      notEmpty: true,
      isUUID: { version: 4, bail: true },
      isLength: {
        options: { max: 255 }
      },
      existsIn: {
        custom: async (value) => {
          if (!(await User.findByPk(value))) {
            throw new Error();
          }
        }
      }
    },
    'data.*.name': {
      optional: {
        options: { nullable: true }
      },
      isString: true,
      isLength: {
        options: { max: 255 }
      }
    },
    'data.*.email': {
      optional: true,
      notEmpty: true,
      isEmail: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      unique: {
        custom: async (value, { path, req: request }) => {
          const { data } = request.body;

          const index = +path.slice(path.indexOf('[') + 1, path.indexOf(']'));

          if (await User.isEmailAlreadyTaken(value, data[index].id)) {
            throw new Error();
          }
        }
      }
    },
    'data.*.username': {
      optional: true,
      notEmpty: true,
      isString: { bail: true },
      isLength: {
        options: { min: 3, max: 255 }
      },
      unique: {
        custom: async (value, { path, req: request }) => {
          const { data } = request.body;

          const index = +path.slice(path.indexOf('[') + 1, path.indexOf(']'));

          if (await User.isUsernameAlreadyTaken(value, data[index].id)) {
            throw new Error();
          }
        }
      }
    },
    'data.*.password': {
      optional: true,
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 6, max: 20 }
      }
    },
    'data.*.password_confirmation': {
      passwordConfirmation: {
        custom: (value, { path, req: request }) => {
          const { data } = request.body;

          const index = +path.slice(path.indexOf('[') + 1, path.indexOf(']'));

          return value === data[index].password;
        }
      }
    },
    'data.*.is_active': {
      optional: true,
      isBoolean: true
    },

    'data.*.roles': {
      optional: true,
      isArray: true
    },
    'data.*.roles.*': {
      isSlug: { bail: true },
      existsIn: {
        custom: async (value) => {
          if (!(await Role.findByPk(value))) {
            throw new Error();
          }
        }
      }
    },
    'data.*.permissions': {
      optional: true,
      isArray: true
    },
    'data.*.permissions.*': {
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
