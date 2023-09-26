const jwt = require('jsonwebtoken');

const { JWT_ALGORITHM, JWT_SECRET, JWT_TTL } = require('../config/jwt');

const sign = (data, options = {}) =>
  jwt.sign(data, getSecret(), {
    algorithm: getAlgorithm(),
    expiresIn: `${getTtl()}m`,
    ...options
  });

const verify = (token) => jwt.verify(token, getSecret());

const getTtl = () => JWT_TTL;

const getAlgorithm = () => JWT_ALGORITHM;

const getSecret = () => JWT_SECRET;

module.exports = {
  sign,
  verify,
  getTtl,
  getAlgorithm
};
