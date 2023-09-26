const helmet = require('helmet');

const helmetConfig = require('../../config/helmet');

module.exports = (req, res, next) => {
  helmet(helmetConfig)(req, res, next);
};
