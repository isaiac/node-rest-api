const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Model = require('./model');

class PermissionUser extends Model {}

PermissionUser.init(
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
    tableName: 'permission_user',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = PermissionUser;
