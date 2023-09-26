const express = require('express');

const roleController = require('../controllers/role');

const hasAbilities = require('../middlewares/auth/has-abilities');
const isAuth = require('../middlewares/auth/is-auth');
const findOrFail = require('../middlewares/queries/find-or-fail');
const queryset = require('../middlewares/queries/queryset');
const validateBulkCreateRequest = require('../middlewares/requests/role/bulk-create');
const validateBulkDestroyRequest = require('../middlewares/requests/role/bulk-destroy');
const validateBulkUpdateRequest = require('../middlewares/requests/role/bulk-update');
const validateCreateRequest = require('../middlewares/requests/role/create');
const validateUpdateRequest = require('../middlewares/requests/role/update');

const router = express.Router();

router.get(
  '/query',
  isAuth,
  hasAbilities('super-admin'),
  queryset,
  roleController.queryList
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/query',
    isAuth,
    hasAbilities('super-admin'),
    queryset,
    roleController.queryUpdate
  );
});

router.delete(
  '/query',
  isAuth,
  hasAbilities('super-admin'),
  queryset,
  roleController.queryDestroy
);

router.post(
  '/bulk',
  isAuth,
  hasAbilities('super-admin'),
  validateBulkCreateRequest,
  roleController.bulkCreate
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/bulk',
    isAuth,
    hasAbilities('super-admin'),
    validateBulkUpdateRequest,
    roleController.bulkUpdate
  );
});

router.delete(
  '/bulk',
  isAuth,
  hasAbilities('super-admin'),
  validateBulkDestroyRequest,
  roleController.bulkDestroy
);

router.get('/', isAuth, hasAbilities('admin'), roleController.list);

router.post(
  '/',
  isAuth,
  hasAbilities('admin', 'add-roles'),
  validateCreateRequest,
  roleController.create
);

router.get(
  '/:role',
  isAuth,
  hasAbilities('admin'),
  findOrFail('role'),
  roleController.fetch
);

['put', 'patch'].forEach((method) => {
  router[method](
    '/:role',
    isAuth,
    hasAbilities('admin', 'edit-roles'),
    findOrFail('role'),
    validateUpdateRequest,
    roleController.update
  );
});

router.delete(
  '/:role',
  isAuth,
  hasAbilities('admin', 'delete-roles'),
  findOrFail('role'),
  roleController.destroy
);

module.exports = router;
