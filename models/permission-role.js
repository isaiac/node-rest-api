const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Model = require('./model');

class PermissionRole extends Model {}

PermissionRole.init(
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
    tableName: 'permission_role',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

module.exports = PermissionRole;
