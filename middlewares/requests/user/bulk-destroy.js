const validateRequest = require('../request');

const User = require('../../../models/user');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['data'];

module.exports = async (req, res, next) => {
  const validationSchema = getValidationSchema({
    data: {
      exists: true,
      isArray: true
    },
    'data.*': {
      isUUID: { version: 4, bail: true },
      existsIn: {
        custom: async (value) => {
          if (!(await User.findByPk(value))) {
            throw new Error();
          }
        }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
