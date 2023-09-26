const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  req.message = req.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR;

  sendError(req, res);
};
