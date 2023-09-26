const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.NOT_FOUND;
  req.message = req.message ?? ReasonPhrases.NOT_FOUND;

  sendError(req, res);
};
