const { sendNoContent, sendOk } = require('../middlewares/http-responses');

const MeResource = require('../resources/me/me');

exports.fetch = async (req, res) => {
  const { authUser } = req;

  req.resource = await MeResource.getJsonAsync(authUser);

  sendOk(req, res);
};

exports.update = async (req, res) => {
  const { authUser } = req;

  await authUser.update(req.body);

  req.resource = await MeResource.getJsonAsync(authUser);

  sendOk(req, res);
};

exports.destroy = async (req, res) => {
  const { authUser } = req;

  await authUser.destroy();

  sendNoContent(req, res);
};
