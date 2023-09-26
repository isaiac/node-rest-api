const { DataTypes, Op } = require('sequelize');
const slugify = require('slugify');

const sequelize = require('../config/database');

const Model = require('./model');
const PermissionRole = require('./permission-role');

class Role extends Model {
  static associate(db) {
    db.Role.belongsToMany(db.Permission, {
      through: db.PermissionRole,
      as: 'permissions',
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    db.Role.belongsToMany(db.User, {
      through: db.RoleUser,
      as: 'users',
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }

  static async findByName(name) {
    return Role.findOne({ where: { name } });
  }

  static async isNameAlreadyTaken(name, id = null) {
    return !!(await Role.count({
      where: { name, id: { [Op[id ? 'ne' : 'not']]: id } }
    }));
  }

  async syncPermissions(permissions) {
    await Promise.all(
      permissions.map(async (permission) => {
        if (!(await this.hasPermission(permission))) {
          await this.addPermission(permission);
        }
      })
    );

    await PermissionRole.destroy({
      where: {
        role_id: { [Op.eq]: this.id },
        permission_id: { [Op.notIn]: permissions }
      }
    });
  }
}

Role.init(
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
    tableName: 'roles',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (role) => {
        role.set('id', slugify(role.get('name'), { lower: true }));
      }
    }
  }
);

module.exports = Role;
