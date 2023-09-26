const validateRequest = require('../request');

const Permission = require('../../../models/permission');
const Role = require('../../../models/role');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['name', 'permissions'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    name: {
      exists: true,
      notEmpty: true,
      isString: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      unique: {
        custom: async (value) => {
          if (await Role.isNameAlreadyTaken(value)) {
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
