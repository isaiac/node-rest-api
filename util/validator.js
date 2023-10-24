const { checkSchema } = require('express-validator');
const { forIn } = require('lodash');

const DEFAULT_LOCATION = 'body';

const MESSAGES = {
  exists: 'The {{field}} field is required.',
  existsIn: 'The {{field}} value is invalid.',
  isArray: 'The {{field}} field must be a valid array.',
  isBoolean: 'The {{field}} field must be true or false.',
  isEmail: 'The {{field}} field must be a valid email address.',
  isIn: 'The {{field}} field must be one of the folliwing values: [{{isIn}}].',
  isLength:
    'The {{field}} field must be between {{min}} and {{max}} characters.',
  isLengthMax:
    'The {{field}} field must not be greater than {{max}} characters.',
  isLengthMin: 'The {{field}} field must be at least {{min}} characters.',
  isSlug: 'The {{field}} field must be a valid slug.',
  isString: 'The {{field}} field must be a valid string.',
  isUUID: 'The {{field}} field must be a valid UUID.',
  notEmpty: 'The {{field}} field must be not empty.',
  passwordConfirmation: 'The password confirmation does not match.',
  unique: 'The {{field}} has already been taken.',
  unverifiedEmail: 'The email is already verified.'
};

const getValidationSchema = (schema) => checkSchema(transformSchema(schema));

const transformSchema = (schema) => {
  const transformedSchema = {};

  forIn(schema, (rules, field) => {
    transformedSchema[field] = { in: DEFAULT_LOCATION };

    forIn(rules, (rule, ruleName) => {
      const { options } = rule;

      switch (ruleName) {
        case 'in':
        case 'errorMessage':
          transformedSchema[field][ruleName] = rule;

          break;
        default:
          transformedSchema[field][ruleName] = {
            ...rule,
            errorMessage:
              rule.errorMessage ?? getMessage(field, ruleName, options)
          };
          break;
      }
    });
  });

  return transformedSchema;
};

const getMessage = (field, ruleName, options = {}) => {
  const message = MESSAGES[transformMessageRuleName(ruleName, options)];

  if (!message) {
    return null;
  }

  return transformMessage(message, field, options);
};

const transformMessageRuleName = (ruleName, { max, min }) => {
  switch (ruleName) {
    case 'isLength':
      if (min && !max) {
        return 'isLengthMin';
      }

      if (max && !min) {
        return 'isLengthMax';
      }

      return 'isLength';
    default:
      return ruleName;
  }
};

const transformMessage = (message, field, options) => {
  const replacements = {
    field,
    isIn: options?.[0]?.join(', '),
    max: options?.max,
    min: options?.min
  };

  forIn(replacements, (replacement, pattern) => {
    message = message.replace(`{{${pattern}}}`, replacement);
  });

  return message;
};

module.exports = { getValidationSchema };
