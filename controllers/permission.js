const {
  sendCreated,
  sendNoContent,
  sendOk
} = require('../middlewares/http-responses');

const Permission = require('../models/permission');

const PermissionResource = require('../resources/permission/permission');

exports.list = async (req, res) => {
  const { queryset = {} } = req;
  const { page, per_page: perPage } = req.query;

  req.resource = page
    ? await PermissionResource.getPaginationAsync(
        await Permission.findAndPaginateAll(
          queryset,
          +page,
          perPage ? +perPage : null
        )
      )
    : await PermissionResource.getCollectionAsync(
        await Permission.findAll(queryset)
      );

  sendOk(req, res);
};

exports.create = async (req, res) => {
  req.resource = await PermissionResource.getJsonAsync(
    await Permission.create(req.body)
  );

  sendCreated(req, res);
};

exports.fetch = async (req, res) => {
  const { permission } = req.params;

  req.resource = await PermissionResource.getJsonAsync(permission);

  sendOk(req, res);
};

exports.update = async (req, res) => {
  const { permission } = req.params;

  await permission.update(req.body);

  req.resource = await PermissionResource.getJsonAsync(permission);

  sendOk(req, res);
};

exports.destroy = async (req, res) => {
  const { permission } = req.params;

  await permission.destroy();

  sendNoContent(req, res);
};

exports.bulkCreate = async (req, res) => {
  const { data = [] } = req.body;

  const permissions = await Permission.bulkCreate(data, {
    individualHooks: true
  });

  req.resource = await PermissionResource.getCollectionAsync(permissions);

  sendCreated(req, res);
};

exports.bulkUpdate = async (req, res) => {
  const { data = [] } = req.body;

  const permissions = await Promise.all(
    data.map(async (permissionData) => {
      const permission = await Permission.findByPk(permissionData.id);

      await permission.update(permissionData);

      return permission;
    })
  );

  req.resource = await PermissionResource.getCollectionAsync(permissions);

  sendOk(req, res);
};

exports.bulkDestroy = async (req, res) => {
  const { data = [] } = req.body;

  await Permission.destroy({ where: { id: data } });

  sendNoContent(req, res);
};

exports.queryList = async (req, res) => {
  const { queryset = {} } = req;
  const { page, per_page: perPage } = req.query;

  req.resource = page
    ? await Permission.findAndPaginateAll(
        queryset,
        +page,
        perPage ? +perPage : null
      )
    : await Permission.findAll(queryset);

  sendOk(req, res);
};

exports.queryUpdate = async (req, res) => {
  const { body = {}, queryset = {} } = req;

  await Permission.update(body, queryset);

  sendNoContent(req, res);
};

exports.queryDestroy = async (req, res) => {
  const { queryset = {} } = req;

  await Permission.destroy(queryset);

  sendNoContent(req, res);
};
