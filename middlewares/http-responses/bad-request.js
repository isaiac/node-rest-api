const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.BAD_REQUEST;
  req.message = req.message ?? ReasonPhrases.BAD_REQUEST;

  sendError(req, res);
};
