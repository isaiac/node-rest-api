const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendError = require('./error');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  req.message = req.message ?? ReasonPhrases.UNPROCESSABLE_ENTITY;

  sendError(req, res);
};
