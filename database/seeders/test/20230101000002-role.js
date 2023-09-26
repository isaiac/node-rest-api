require('../../../models');
const Role = require('../../../models/role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const roles = [
      { name: 'Super Admin' },
      { name: 'Admin' },
      { name: 'User' }
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
