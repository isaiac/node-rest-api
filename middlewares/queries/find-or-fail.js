const { capitalize } = require('lodash');

const { sendNotFound } = require('../http-responses');

const db = require('../../models');

const RESOURCE_NOT_FOUND = 'Resource not found';

module.exports = (param, className = capitalize(param)) => {
  const Collection = db[className] ?? null;

  return async (req, res, next) => {
    try {
      req.params[param] = await Collection.findByPk(req.params[param]);

      if (!req.params[param]) {
        throw new Error();
      }

      next();
    } catch (_) {
      req.errors = RESOURCE_NOT_FOUND;

      sendNotFound(req, res);
    }
  };
};
