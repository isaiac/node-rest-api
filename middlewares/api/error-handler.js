const { sendInternalServerError } = require('../http-responses');

/* eslint no-unused-vars: 'off' */
module.exports = (err, req, res, _) => {
  sendInternalServerError(req, res);
};
