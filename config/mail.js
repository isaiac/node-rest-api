const nodemailer = require('nodemailer');

const {
  MAIL_HOST = 'smtp.mailgun.org',
  MAIL_PORT = 465,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_FROM_ADDRESS = 'hello@example.com',
  MAIL_FROM_NAME = 'Example',
  PASSWORD_RESET_URL = 'http://localhost:8888/auth/password',
  VERIFICATION_URL = 'http://localhost:8888/auth/verification'
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD
  }
});

module.exports = {
  MAIL_FROM_ADDRESS,
  MAIL_FROM_NAME,
  VERIFICATION_URL,
  PASSWORD_RESET_URL,
  transporter
};
