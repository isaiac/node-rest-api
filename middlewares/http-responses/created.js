const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendSuccess = require('./success');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.CREATED;
  req.message = req.message ?? ReasonPhrases.CREATED;

  sendSuccess(req, res);
};
