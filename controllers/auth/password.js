const { APP_URL } = require('../../config/app');

const {
  sendAccepted,
  sendNoContent,
  sendOk,
  sendUnprocessableEntity
} = require('../../middlewares/http-responses');

const User = require('../../models/user');

const {
  generatePasswordResetToken,
  sendPasswordResetEmail
} = require('../../services/auth');

const { verify: verifyJwt } = require('../../util/jwt');

exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findByEmail(email);

  try {
    await sendPasswordResetEmail(user);
  } catch (_) {}

  return sendAccepted(req, res);
};

exports.passwordReset = async (req, res) => {
  let { token } = req.query;

  try {
    token = verifyJwt(token);

    const email = token?.data?.email;

    if (!email) {
      throw new Error();
    }

    const user = await User.findByEmail(email);

    if (!user) {
      throw new Error();
    }

    return res.render('auth/password-reset', {
      resetPasswordUrl: `${APP_URL}/auth/password`,
      user
    });
  } catch (_) {
    return res.render('auth/invalid-password-reset-token');
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  let { token } = req.body;

  try {
    token = verifyJwt(token);

    const email = token?.data?.email;

    if (!email) {
      throw new Error();
    }

    const user = await User.findByEmail(email);

    if (!user) {
      req.errors = 'The email does not exist.';

      return sendUnprocessableEntity(req, res);
    }

    await user.update({ password });

    return sendNoContent(req, res);
  } catch (_) {
    req.errors = 'Invalid token.';

    return sendUnprocessableEntity(req, res);
  }
};

exports.generatePasswordResetToken = async (req, res) => {
  const { email } = req.body;

  req.resource = { token: generatePasswordResetToken(email) };

  return sendOk(req, res);
};
