const express = require('express');

const meController = require('../controllers/me');

const isAuth = require('../middlewares/auth/is-auth');
const validateUpdateRequest = require('../middlewares/requests/me/update');

const router = express.Router();

router.get('/', isAuth, meController.fetch);

['put', 'patch'].forEach((method) => {
  router[method]('/', isAuth, validateUpdateRequest, meController.update);
});

router.delete('/', isAuth, meController.destroy);

module.exports = router;
