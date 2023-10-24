const { forIn } = require('lodash');
const { literal, Op } = require('sequelize');

const getInclude = (embed) => (embed ? embed.split(',') : []);

const getAttributes = (fields) =>
  fields && fields !== '*' ? fields.split(',') : [];

const getWhere = (filters) => {
  let where = literal('1 = 1');

  if (filters) {
    where = {};

    forIn(filters, (value, fieldWithOperator) => {
      const [field, operator = 'eq'] = fieldWithOperator.split('.');

      where[field] = {
        [transformOperator(operator)]: transformValue(value, operator)
      };
    });
  }

  return where;
};

const getOrder = (sort) =>
  sort
    ? sort.split(',').map((field) => {
        let direction = 'ASC';

        if (field.charAt(0) === '-') {
          field = field.substring(1);
          direction = 'DESC';
        }

        return [field, direction];
      })
    : [];

const transformOperator = (operator) => Op[operator] ?? Op.eq;

const transformValue = (value, operator) => {
  switch (operator) {
    case 'is':
    case 'not':
      if (['1', 'true', 'yes'].includes(value)) {
        return true;
      }

      if (['0', 'false', 'no'].includes(value)) {
        return false;
      }

      return null;
    case 'or':
    case 'between':
    case 'notBetween':
    case 'in':
    case 'notIn':
      return value.split(',');
    default:
      return value;
  }
};

module.exports = (req, res, next) => {
  const {
    query: { embed, fields, filter: filters, limit, offset, sort }
  } = req;

  const queryset = {};

  const include = getInclude(embed);
  const attributes = getAttributes(fields);
  const where = getWhere(filters);
  const order = getOrder(sort);

  if (include.length) {
    queryset.include = include;
  }

  if (attributes.length) {
    queryset.attributes = attributes;
  }

  if (where) {
    queryset.where = where;
  }

  if (order.length) {
    queryset.order = order;
  }

  if (offset) {
    queryset.offset = +offset;
  }

  if (limit) {
    queryset.limit = +limit;
  }

  req.queryset = queryset;

  next();
};
