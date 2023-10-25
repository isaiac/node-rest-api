require('../../../models');
const Role = require('../../../models/role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const date = '2023-01-01 00:00:00';

    const roles = [
      {
        name: 'Super Admin',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Admin',
        created_at: date,
        updated_at: date,
        permissions: ['view-users', 'add-users', 'edit-users', 'delete-users']
      },
      {
        name: 'User',
        created_at: date,
        updated_at: date
      }
    ];

    await Promise.all(
      roles.map(async (role) => {
        const { permissions } = role;

        role = await Role.create(role);

        if (permissions) {
          await role.syncPermissions(permissions);
        }
      })
    );
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('roles', null, {});
  }
};
