const validateRequest = require('../request');

const Role = require('../../../models/role');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['data'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    data: {
      exists: true,
      isArray: true
    },
    'data.*': {
      isSlug: { bail: true },
      existsIn: {
        custom: async (value) => {
          if (!(await Role.findByPk(value))) {
            throw new Error();
          }
        }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
