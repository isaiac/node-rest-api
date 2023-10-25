require('../../../models');
const User = require('../../../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const users = [
      {
        name: 'Admin',
        email: 'admin@example.com',
        username: 'admin',
        password: 'changeme.123',
        roles: ['admin'],
        permissions: [
          'view-users',
          'add-users',
          'edit-users',
          'delete-users',
          'view-roles',
          'add-roles',
          'edit-roles',
          'delete-roles',
          'view-permissions',
          'add-permissions',
          'edit-permissions',
          'delete-permissions'
        ]
      },
      {
        name: 'User',
        email: 'user@example.com',
        username: 'user',
        password: 'changeme.123',
        roles: ['user']
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
