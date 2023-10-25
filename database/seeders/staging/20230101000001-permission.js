require('../../../models');
const Permission = require('../../../models/permission');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const date = '2023-01-01 00:00:00';

    const permissions = [
      {
        name: 'View Users',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Add Users',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Edit Users',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Delete Users',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Add Roles',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Edit Roles',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Delete Roles',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Add Permissions',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Edit Permissions',
        created_at: date,
        updated_at: date
      },
      {
        name: 'Delete Permissions',
        created_at: date,
        updated_at: date
      }
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
