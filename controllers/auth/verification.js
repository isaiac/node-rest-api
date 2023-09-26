const { APP_NAME } = require('../../config/app');

const {
  sendAccepted,
  sendNoContent,
  sendOk,
  sendUnprocessableEntity
} = require('../../middlewares/http-responses');

const User = require('../../models/user');

const {
  generateVerificationToken,
  sendVerificationEmail
} = require('../../services/auth');

const { verify: verifyJwt } = require('../../util/jwt');

exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.scope('unverified').findOne({ where: { email } });

  try {
    await sendVerificationEmail(user);
  } catch (_) {}

  return sendAccepted(req, res);
};

exports.verification = async (req, res) => {
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

    if (user.isVerified()) {
      return res.render('auth/email-already-verified');
    }

    await user.update({ email_verified_at: new Date() });

    return res.render('auth/account-activated', { appName: APP_NAME, user });
  } catch (_) {
    return res.render('auth/invalid-verification-token');
  }
};

exports.verify = async (req, res) => {
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

    if (user.isVerified()) {
      req.errors = 'The email is already verified.';

      return sendUnprocessableEntity(req, res);
    }

    await user.update({ email_verified_at: new Date() });

    return sendNoContent(req, res);
  } catch (_) {
    req.errors = 'Invalid token.';

    return sendUnprocessableEntity(req, res);
  }
};

exports.generateVerificationToken = async (req, res) => {
  const { email } = req.body;

  req.resource = { token: generateVerificationToken(email) };

  return sendOk(req, res);
};
