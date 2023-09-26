/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_user', {
      role_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: { model: 'roles', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('role_user');
  }
};
