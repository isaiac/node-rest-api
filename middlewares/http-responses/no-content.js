const { StatusCodes } = require('http-status-codes');

const sendSuccess = require('./success');

module.exports = (req, res) => {
  req.sendStatus = req.message ?? StatusCodes.NO_CONTENT;

  sendSuccess(req, res);
};
