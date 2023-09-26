const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.UNAUTHORIZED;
  req.message = req.message ?? ReasonPhrases.UNAUTHORIZED;

  sendError(req, res);
};
