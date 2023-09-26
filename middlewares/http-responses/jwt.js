const { StatusCodes } = require('http-status-codes');

const { getTtl: getJwtTtl } = require('../../util/jwt');

module.exports = (req, res) => {
  const { token = null } = req;

  res.status(StatusCodes.OK).json({
    status_code: StatusCodes.OK,
    access_token: token,
    token_type: 'bearer',
    expires_in: getJwtTtl() * 60
  });
};
