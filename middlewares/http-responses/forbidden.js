const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.FORBIDDEN;
  req.message = req.message ?? ReasonPhrases.FORBIDDEN;

  sendError(req, res);
};
