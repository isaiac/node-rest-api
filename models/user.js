const bcrypt = require('bcrypt');
const { DataTypes, Op } = require('sequelize');

const sequelize = require('../config/database');

const Model = require('./model');
const PermissionUser = require('./permission-user');
const RoleUser = require('./role-user');

const SALT_ROUNDS = 12;

class User extends Model {
  _hidden = ['password'];

  static associate(db) {
    db.User.belongsToMany(db.Role, {
      through: db.RoleUser,
      as: 'roles',
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    db.User.belongsToMany(db.Permission, {
      through: db.PermissionUser,
      as: 'permissions',
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }

  static async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static async findByUsername(username) {
    return User.findOne({ where: { username } });
  }

  static async isEmailAlreadyTaken(email, id = null) {
    return !!(await User.count({
      where: { email, id: { [Op[id ? 'ne' : 'not']]: id } }
    }));
  }

  static async isUsernameAlreadyTaken(username, id = null) {
    return !!(await User.count({
      where: { username, id: { [Op[id ? 'ne' : 'not']]: id } }
    }));
  }

  isVerified() {
    return !!this.email_verified_at;
  }

  isUnverified() {
    return !this.email_verified_at;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async syncRoles(roles) {
    await Promise.all(
      roles.map(async (role) => {
        if (!(await this.hasRole(role))) {
          await this.addRole(role);
        }
      })
    );

    await RoleUser.destroy({
      where: {
        user_id: { [Op.eq]: this.id },
        role_id: { [Op.notIn]: roles }
      }
    });
  }

  async syncPermissions(permissions) {
    await Promise.all(
      permissions.map(async (permission) => {
        if (!(await this.hasPermission(permission))) {
          await this.addPermission(permission);
        }
      })
    );

    await PermissionUser.destroy({
      where: {
        user_id: { [Op.eq]: this.id },
        permission_id: { [Op.notIn]: permissions }
      }
    });
  }

  async getAbilities() {
    if (await this.hasRole('super-admin')) {
      return ['*'];
    }

    return [
      ...(await this.getRoles()).map((role) => role.id),
      ...(await this.getPermissions()).map((permission) => permission.id)
    ];
  }

  async hasAbility(abilities) {
    const userAbilities = await this.getAbilities();

    return (
      userAbilities.includes('*') ||
      abilities.some((ability) => userAbilities.includes(ability))
    );
  }

  async hasAbilities(abilities) {
    const userAbilities = await this.getAbilities();

    return (
      userAbilities.includes('*') ||
      abilities.every((ability) => userAbilities.includes(ability))
    );
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    email_verified_at: {
      type: DataTypes.DATE
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
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (user) => {
        if (user.changed('password')) {
          user.set(
            'password',
            await bcrypt.hash(user.get('password'), SALT_ROUNDS)
          );
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.set(
            'password',
            await bcrypt.hash(user.get('password'), SALT_ROUNDS)
          );
        }
      }
    },
    scopes: {
      active: {
        where: {
          is_active: {
            [Op.is]: true
          }
        }
      },
      inactive: {
        where: {
          is_active: {
            [Op.not]: true
          }
        }
      },
      verified: {
        where: {
          email_verified_at: {
            [Op.not]: null
          }
        }
      },
      unverified: {
        where: {
          email_verified_at: {
            [Op.is]: null
          }
        }
      }
    }
  }
);

module.exports = User;
