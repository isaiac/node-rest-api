const {
  sendCreated,
  sendNoContent,
  sendOk
} = require('../middlewares/http-responses');

const Role = require('../models/role');

const RoleResource = require('../resources/role/role');

exports.list = async (req, res) => {
  const { queryset = {} } = req;
  const { page, per_page: perPage } = req.query;

  req.resource = page
    ? await RoleResource.getPaginationAsync(
        await Role.findAndPaginateAll(
          queryset,
          +page,
          perPage ? +perPage : null
        )
      )
    : await RoleResource.getCollectionAsync(await Role.findAll(queryset));

  sendOk(req, res);
};

exports.create = async (req, res) => {
  const { permissions } = req.body;

  const role = await Role.create(req.body);

  if (permissions) {
    await role.syncPermissions(permissions);
  }

  req.resource = await RoleResource.getJsonAsync(role);

  sendCreated(req, res);
};

exports.fetch = async (req, res) => {
  const { role } = req.params;

  req.resource = await RoleResource.getJsonAsync(role);

  sendOk(req, res);
};

exports.update = async (req, res) => {
  const { role } = req.params;
  const { permissions } = req.body;

  await role.update(req.body);

  if (permissions) {
    await role.syncPermissions(permissions);
  }

  req.resource = await RoleResource.getJsonAsync(role);

  sendOk(req, res);
};

exports.destroy = async (req, res) => {
  const { role } = req.params;

  await role.destroy();

  sendNoContent(req, res);
};

exports.bulkCreate = async (req, res) => {
  const { data = [] } = req.body;

  const roles = await Promise.all(
    data.map(async (roleData) => {
      const { permissions } = roleData;

      const role = await Role.create(roleData);

      if (permissions) {
        await role.syncPermissions(permissions);
      }

      return role;
    })
  );

  req.resource = await RoleResource.getCollectionAsync(roles);

  sendCreated(req, res);
};

exports.bulkUpdate = async (req, res) => {
  const { data = [] } = req.body;

  const roles = await Promise.all(
    data.map(async (roleData) => {
      const { permissions } = roleData;

      const role = await Role.findByPk(roleData.id);

      await role.update(roleData);

      if (permissions) {
        await role.syncPermissions(permissions);
      }

      return role;
    })
  );

  req.resource = await RoleResource.getCollectionAsync(roles);

  sendOk(req, res);
};

exports.bulkDestroy = async (req, res) => {
  const { data = [] } = req.body;

  await Role.destroy({ where: { id: data } });

  sendNoContent(req, res);
};

exports.queryList = async (req, res) => {
  const { queryset = {} } = req;
  const { page, per_page: perPage } = req.query;

  req.resource = page
    ? await Role.findAndPaginateAll(queryset, +page, perPage ? +perPage : null)
    : await Role.findAll(queryset);

  sendOk(req, res);
};

exports.queryUpdate = async (req, res) => {
  const { body = {}, queryset = {} } = req;

  await Role.update(body, queryset);

  sendNoContent(req, res);
};

exports.queryDestroy = async (req, res) => {
  const { queryset = {} } = req;

  await Role.destroy(queryset);

  sendNoContent(req, res);
};
