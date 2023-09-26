const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const sendSuccess = require('./success');

module.exports = (req, res) => {
  req.statusCode = StatusCodes.OK;
  req.message = req.message ?? ReasonPhrases.OK;

  sendSuccess(req, res);
};
