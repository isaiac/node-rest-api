require('../../../models');
const Permission = require('../../../models/permission');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const permissions = [
      { name: 'Add Users' },
      { name: 'Edit Users' },
      { name: 'Delete Users' },
      { name: 'Add Roles' },
      { name: 'Edit Roles' },
      { name: 'Delete Roles' },
      { name: 'Add Permissions' },
      { name: 'Edit Permissions' },
      { name: 'Delete Permissions' }
    ];

    await Promise.all(
      permissions.map(async (permission) => {
        await Permission.create(permission);
      })
    );
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('permissions', null, {});
  }
};
