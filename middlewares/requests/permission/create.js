const validateRequest = require('../request');

const Permission = require('../../../models/permission');

const { getValidationSchema } = require('../../../util/validator');

const REQUEST_FIELDS = ['name'];

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
          if (await Permission.isNameAlreadyTaken(value)) {
            throw new Error();
          }
        }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
