const { sendUnauthorized } = require('../http-responses');

const User = require('../../models/user');

const { verify: verifyJwt } = require('../../util/jwt');

const getAccessToken = ({ headers }) => {
  const matches = [
    ...(headers.authorization ?? '').matchAll(/^Bearer\s(?<token>.*)$/g)
  ][0];

  return matches?.groups?.token ?? null;
};

module.exports = async (req, res, next) => {
  try {
    const accessToken = getAccessToken(req);

    const token = verifyJwt(accessToken);

    req.authUser = await User.scope('active').findByPk(token.sub);

    if (!req.authUser) {
      return sendUnauthorized(req, res);
    }

    return next();
  } catch (error) {
    req.message = error.name;
    req.errors = error.message;

    return sendUnauthorized(req, res);
  }
};
