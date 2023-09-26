const { ReasonPhrases, StatusCodes } = require('http-status-codes');

module.exports = (req, res) => {
  const {
    errors = null,
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    resource,
    sendStatus,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  } = req;

  if (sendStatus) {
    return res.sendStatus(sendStatus);
  }

  let json = {};

  if (resource) {
    json = resource;
  } else {
    json = { status_code: statusCode, message, errors };
  }

  return res.status(statusCode).json(json);
};
