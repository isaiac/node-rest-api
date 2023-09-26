const { ReasonPhrases, StatusCodes } = require('http-status-codes');

module.exports = (req, res) => {
  const {
    data = null,
    message = ReasonPhrases.OK,
    resource,
    sendStatus,
    statusCode = StatusCodes.OK
  } = req;

  if (sendStatus) {
    return res.sendStatus(sendStatus);
  }

  let json = {};

  if (resource) {
    json = resource;
  } else {
    json = { status_code: statusCode, message, data };
  }

  return res.status(statusCode).json(json);
};
