const validateRequest = require('../request');

const Permission = require('../../../models/permission');

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
      isSlug: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      existsIn: {
        custom: async (value) => {
          if (!(await Permission.findByPk(value))) {
            throw new Error();
          }
        }
      }
    },
    'data.*.name': {
      optional: true,
      notEmpty: true,
      isString: { bail: true },
      isLength: {
        options: { max: 255 }
      },
      unique: {
        custom: async (value, { path, req: request }) => {
          const { data } = request.body;

          const index = +path.slice(path.indexOf('[') + 1, path.indexOf(']'));

          if (await Permission.isNameAlreadyTaken(value, data[index].id)) {
            throw new Error();
          }
        }
      }
    }
  });

  validateRequest(validationSchema, REQUEST_FIELDS)(req, res, next);
};
