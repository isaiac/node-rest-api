const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Model = require('./model');

class RoleUser extends Model {}

RoleUser.init(
  {
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'role_user',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = RoleUser;
