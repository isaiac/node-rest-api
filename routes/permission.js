const express = require('express');

const permissionController = require('../controllers/permission');

const hasAbilities = require('../middlewares/auth/has-abilities');
const isAuth = require('../middlewares/auth/is-auth');
const findOrFail = require('../middlewares/queries/find-or-fail');
const queryset = require('../middlewares/queries/queryset');
const validateBulkCreateRequest = require('../middlewares/requests/permission/bulk-create');
const validateBulkDestroyRequest = require('../middlewares/requests/permission/bulk-destroy');
const validateBulkUpdateRequest = require('../middlewares/requests/permission/bulk-update');
const validateCreateRequest = require('../middlewares/requests/permission/create');
const validateUpdateRequest = require('../middlewares/requests/permission/update');

const router = express.Router();

router.get(
  '/query',
  isAuth,
  hasAbilities('super-admin'),
  queryset,
  permissionController.queryList
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/query',
    isAuth,
    hasAbilities('super-admin'),
    queryset,
    permissionController.queryUpdate
  );
});

router.delete(
  '/query',
  isAuth,
  hasAbilities('super-admin'),
  queryset,
  permissionController.queryDestroy
);

router.post(
  '/bulk',
  isAuth,
  hasAbilities('super-admin'),
  validateBulkCreateRequest,
  permissionController.bulkCreate
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/bulk',
    isAuth,
    hasAbilities('super-admin'),
    validateBulkUpdateRequest,
    permissionController.bulkUpdate
  );
});

router.delete(
  '/bulk',
  isAuth,
  hasAbilities('super-admin'),
  validateBulkDestroyRequest,
  permissionController.bulkDestroy
);

router.get(
  '/',
  isAuth,
  hasAbilities('admin', 'view-permissions'),
  queryset,
  permissionController.list
);

router.post(
  '/',
  isAuth,
  hasAbilities('admin', 'add-permissions'),
  validateCreateRequest,
  permissionController.create
);

router.get(
  '/:permission',
  isAuth,
  hasAbilities('admin', 'view-permissions'),
  findOrFail('permission'),
  permissionController.fetch
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/:permission',
    isAuth,
    hasAbilities('admin', 'edit-permissions'),
    findOrFail('permission'),
    validateUpdateRequest,
    permissionController.update
  );
});

router.delete(
  '/:permission',
  isAuth,
  hasAbilities('admin', 'delete-permissions'),
  findOrFail('permission'),
  permissionController.destroy
);

module.exports = router;
