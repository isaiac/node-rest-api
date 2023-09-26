const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendSuccess = require('./success');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.ACCEPTED;
  req.message = req.message ?? ReasonPhrases.ACCEPTED;

  sendSuccess(req, res);
};
