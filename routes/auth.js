const express = require('express');

const loginController = require('../controllers/auth/login');
const passwordController = require('../controllers/auth/password');
const registerController = require('../controllers/auth/register');
const verificationController = require('../controllers/auth/verification');

const hasAbilities = require('../middlewares/auth/has-abilities');
const isAuth = require('../middlewares/auth/is-auth');
const findOrFail = require('../middlewares/queries/find-or-fail');
const validateLoginRequest = require('../middlewares/requests/auth/login');
const validateGeneratePasswordResetTokenRequest = require('../middlewares/requests/auth/generate-password-reset-token');
const validateGenerateVerificationTokenRequest = require('../middlewares/requests/auth/generate-verification-token');
const validateRegisterRequest = require('../middlewares/requests/auth/register');
const validateResetPasswordRequest = require('../middlewares/requests/auth/reset-password');
const validateSendPasswordResetEmailRequest = require('../middlewares/requests/auth/send-password-reset-email');
const validateSendVerificationEmailRequest = require('../middlewares/requests/auth/send-verification-email');
const validateVerifyRequest = require('../middlewares/requests/auth/verify');

const router = express.Router();

router.post('/register', validateRegisterRequest, registerController.register);

router.post(
  '/verification',
  validateSendVerificationEmailRequest,
  verificationController.sendVerificationEmail
);

router.get('/verification', verificationController.verification);

router.patch(
  '/verification',
  validateVerifyRequest,
  verificationController.verify
);

router.post(
  '/verification/token',
  isAuth,
  hasAbilities('super-admin'),
  validateGenerateVerificationTokenRequest,
  verificationController.generateVerificationToken
);

router.post(
  '/password',
  validateSendPasswordResetEmailRequest,
  passwordController.sendPasswordResetEmail
);

router.get('/password', passwordController.passwordReset);

router.patch(
  '/password',
  validateResetPasswordRequest,
  passwordController.resetPassword
);

router.post(
  '/password/token',
  isAuth,
  hasAbilities('super-admin'),
  validateGeneratePasswordResetTokenRequest,
  passwordController.generatePasswordResetToken
);

router.post('/login', validateLoginRequest, loginController.login);

router.post(
  '/login/:user',
  isAuth,
  hasAbilities('super-admin'),
  findOrFail('user'),
  loginController.loginAs
);

module.exports = router;
