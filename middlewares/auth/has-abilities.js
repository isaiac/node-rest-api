const { sendForbidden, sendUnauthorized } = require('../http-responses');

module.exports =
  (...abilities) =>
  async (req, res, next) => {
    const { authUser } = req;

    if (!authUser) {
      return sendUnauthorized(req, res);
    }

    if (!(await authUser.hasAbilities(abilities))) {
      return sendForbidden(req, res);
    }

    return next();
  };
