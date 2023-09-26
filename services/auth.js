const ejs = require('ejs');
const path = require('path');

const { APP_NAME } = require('../config/app');
const {
  MAIL_FROM_ADDRESS,
  MAIL_FROM_NAME,
  PASSWORD_RESET_URL,
  transporter,
  VERIFICATION_URL
} = require('../config/mail');

const { dirPath } = require('../util/path');
const { sign: signJwt } = require('../util/jwt');

const VERIFICATION_EMAIL_JWT_TTL = 120;
const PASSWORD_RESET_EMAIL_JWT_TTL = 120;

const sendVerificationEmail = async (user) => {
  const token = generateVerificationToken(user.email);

  const verificationUrl = `${VERIFICATION_URL}?token=${token}`;

  const view = await ejs.renderFile(
    path.join(dirPath, '../views/templates/email/verification.ejs'),
    { appName: APP_NAME, user, verificationUrl }
  );

  return transporter.sendMail({
    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`,
    to: `"${user.username}" <${user.email}>`,
    subject: `[${APP_NAME}] Verify your email address`,
    text: view,
    html: view
  });
};

const sendPasswordResetEmail = async (user) => {
  const token = generateVerificationToken(user.email);

  const passwordResetUrl = `${PASSWORD_RESET_URL}?token=${token}`;

  const view = await ejs.renderFile(
    path.join(dirPath, '../views/templates/email/password-reset.ejs'),
    { user, passwordResetUrl }
  );

  return transporter.sendMail({
    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`,
    to: `"${user.username}" <${user.email}>`,
    subject: `[${APP_NAME}] Reset your password`,
    text: view,
    html: view
  });
};

const generateAccessToken = (userId) => signJwt({ sub: userId });

const generateVerificationToken = (email) =>
  signJwt({ data: { email } }, { expiresIn: `${VERIFICATION_EMAIL_JWT_TTL}m` });

const generatePasswordResetToken = (email) =>
  signJwt(
    { data: { email } },
    { expiresIn: `${PASSWORD_RESET_EMAIL_JWT_TTL}m` }
  );

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  generateAccessToken,
  generateVerificationToken,
  generatePasswordResetToken
};
