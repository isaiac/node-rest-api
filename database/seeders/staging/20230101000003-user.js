require('../../../models');
const User = require('../../../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const date = '2023-01-01 00:00:00';

    const users = [
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        username: 'superadmin',
        password: 'superadmin',
        email_verified_at: date,
        created_at: date,
        updated_at: date,
        roles: ['super-admin']
      }
    ];

    await Promise.all(
      users.map(async (user) => {
        const { roles, permissions } = user;

        user = await User.create(user);

        if (roles) {
          await user.syncRoles(roles);
        }

        if (permissions) {
          await user.syncPermissions(permissions);
        }
      })
    );
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('users', null, {});
  }
};
