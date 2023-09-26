const {
  sendCreated,
  sendNoContent,
  sendOk
} = require('../middlewares/http-responses');

const User = require('../models/user');

const UserResource = require('../resources/user/user');

exports.list = async (req, res) => {
  const { queryset = {} } = req;
  const { page, per_page: perPage } = req.query;

  req.resource = page
    ? await UserResource.getPaginationAsync(
        await User.findAndPaginateAll(
          queryset,
          +page,
          perPage ? +perPage : null
        )
      )
    : await UserResource.getCollectionAsync(await User.findAll(queryset));

  sendOk(req, res);
};

exports.create = async (req, res) => {
  const { permissions, roles } = req.body;

  const user = await User.create(req.body);

  if (roles) {
    await user.syncRoles(roles);
  }

  if (permissions) {
    await user.syncPermissions(permissions);
  }

  req.resource = await UserResource.getJsonAsync(user);

  sendCreated(req, res);
};

exports.fetch = async (req, res) => {
  const { user } = req.params;

  req.resource = await UserResource.getJsonAsync(user);

  sendOk(req, res);
};

exports.update = async (req, res) => {
  const { user } = req.params;
  const { permissions, roles } = req.body;

  await user.update(req.body);

  if (roles) {
    await user.syncRoles(roles);
  }

  if (permissions) {
    await user.syncPermissions(permissions);
  }

  req.resource = await UserResource.getJsonAsync(user);

  sendOk(req, res);
};

exports.destroy = async (req, res) => {
  const { user } = req.params;

  await user.destroy();

  sendNoContent(req, res);
};

exports.bulkCreate = async (req, res) => {
  const { data = [] } = req.body;

  const users = await Promise.all(
    data.map(async (userData) => {
      const { permissions, roles } = userData;

      const user = await User.create(userData);

      if (roles) {
        await user.syncRoles(roles);
      }

      if (permissions) {
        await user.syncPermissions(permissions);
      }

      return user;
    })
  );

  req.resource = await UserResource.getCollectionAsync(users);

  sendCreated(req, res);
};

exports.bulkUpdate = async (req, res) => {
  const { data = [] } = req.body;

  const users = await Promise.all(
    data.map(async (userData) => {
      const { permissions, roles } = userData;

      const user = await User.findByPk(userData.id);

      await user.update(userData);

      if (roles) {
        await user.syncRoles(roles);
      }

      if (permissions) {
        await user.syncPermissions(permissions);
      }

      return user;
    })
  );

  req.resource = await UserResource.getCollectionAsync(users);

  sendOk(req, res);
};

exports.bulkDestroy = async (req, res) => {
  const { data = [] } = req.body;

  await User.destroy({ where: { id: data } });

  sendNoContent(req, res);
};

exports.queryList = async (req, res) => {
  const { queryset = {} } = req;
  const { page, per_page: perPage } = req.query;

  req.resource = page
    ? await User.findAndPaginateAll(queryset, +page, perPage ? +perPage : null)
    : await User.findAll(queryset);

  sendOk(req, res);
};

exports.queryUpdate = async (req, res) => {
  const { body = {}, queryset = {} } = req;

  await User.update(body, queryset);

  sendNoContent(req, res);
};

exports.queryDestroy = async (req, res) => {
  const { queryset = {} } = req;

  await User.destroy(queryset);

  sendNoContent(req, res);
};
