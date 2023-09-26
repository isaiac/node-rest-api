const { sendCreated } = require('../../middlewares/http-responses');

const User = require('../../models/user');

const MeResource = require('../../resources/me/me');

const { sendVerificationEmail } = require('../../services/auth');

exports.register = async (req, res) => {
  const user = await User.create(req.body);

  await user.syncRoles(['user']);

  req.resource = await MeResource.getJsonAsync(user);

  try {
    await sendVerificationEmail(user);
  } catch (_) {}

  sendCreated(req, res);
};
