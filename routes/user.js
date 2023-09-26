const express = require('express');

const userController = require('../controllers/user');

const hasAbilities = require('../middlewares/auth/has-abilities');
const isAuth = require('../middlewares/auth/is-auth');
const findOrFail = require('../middlewares/queries/find-or-fail');
const queryset = require('../middlewares/queries/queryset');
const validateBulkCreateRequest = require('../middlewares/requests/user/bulk-create');
const validateBulkDestroyRequest = require('../middlewares/requests/user/bulk-destroy');
const validateBulkUpdateRequest = require('../middlewares/requests/user/bulk-update');
const validateCreateRequest = require('../middlewares/requests/user/create');
const validateUpdateRequest = require('../middlewares/requests/user/update');

const router = express.Router();

router.get(
  '/query',
  isAuth,
  hasAbilities('super-admin'),
  queryset,
  userController.queryList
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/query',
    isAuth,
    hasAbilities('super-admin'),
    queryset,
    userController.queryUpdate
  );
});

router.delete(
  '/query',
  isAuth,
  hasAbilities('super-admin'),
  queryset,
  userController.queryDestroy
);

router.post(
  '/bulk',
  isAuth,
  hasAbilities('super-admin'),
  validateBulkCreateRequest,
  userController.bulkCreate
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/bulk',
    isAuth,
    hasAbilities('super-admin'),
    validateBulkUpdateRequest,
    userController.bulkUpdate
  );
});

router.delete(
  '/bulk',
  isAuth,
  hasAbilities('super-admin'),
  validateBulkDestroyRequest,
  userController.bulkDestroy
);

router.get('/', isAuth, hasAbilities('admin'), userController.list);

router.post(
  '/',
  isAuth,
  hasAbilities('admin', 'add-users'),
  validateCreateRequest,
  userController.create
);

router.get(
  '/:user',
  isAuth,
  hasAbilities('admin'),
  findOrFail('user'),
  userController.fetch
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/:user',
    isAuth,
    hasAbilities('admin', 'edit-users'),
    findOrFail('user'),
    validateUpdateRequest,
    userController.update
  );
});

router.delete(
  '/:user',
  isAuth,
  hasAbilities('admin', 'delete-users'),
  findOrFail('user'),
  userController.destroy
);

module.exports = router;
