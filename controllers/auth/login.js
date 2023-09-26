const { Op } = require('sequelize');

const {
  sendJwt,
  sendUnauthorized
} = require('../../middlewares/http-responses');

const User = require('../../models/user');

const { generateAccessToken } = require('../../services/auth');

exports.login = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.scope('active').findOne({
    where: { [Op.or]: [{ email: login }, { username: login }] }
  });

  if (!user || !(await user.checkPassword(password))) {
    return sendUnauthorized(req, res);
  }

  req.token = generateAccessToken(user.id);

  return sendJwt(req, res);
};

exports.loginAs = async (req, res) => {
  const { user } = req.params;

  req.token = generateAccessToken(user.id);

  return sendJwt(req, res);
};
