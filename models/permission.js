const { DataTypes, Op } = require('sequelize');
const slugify = require('slugify');

const sequelize = require('../config/database');

const Model = require('./model');

class Permission extends Model {
  static associate(db) {
    db.Permission.belongsToMany(db.Role, {
      through: db.PermissionRole,
      as: 'roles',
      foreignKey: 'permission_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    db.Permission.belongsToMany(db.User, {
      through: db.PermissionUser,
      as: 'users',
      foreignKey: 'permission_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }

  static async findByName(name) {
    return Permission.findOne({ where: { name } });
  }

  static async isNameAlreadyTaken(name, id = null) {
    return !!(await Permission.count({
      where: { name, id: { [Op[id ? 'ne' : 'not']]: id } }
    }));
  }
}

Permission.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'permissions',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (permission) => {
        permission.set('id', slugify(permission.get('name'), { lower: true }));
      }
    }
  }
);

module.exports = Permission;
