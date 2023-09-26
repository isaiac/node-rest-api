const { APP_NAME } = require('../config/app');

const { sendOk } = require('../middlewares/http-responses');

exports.ping = (req, res) => {
  req.message = `Welcome to ${APP_NAME}!`;

  sendOk(req, res);
};
