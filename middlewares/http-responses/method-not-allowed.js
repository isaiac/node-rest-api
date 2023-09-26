const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  req.message = req.message ?? ReasonPhrases.METHOD_NOT_ALLOWED;

  sendError(req, res);
};
