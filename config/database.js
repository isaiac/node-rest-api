const { Sequelize } = require('sequelize');

const databases = require('../database/config');

const db = databases[process.env.NODE_ENV];

let sequelize;

if (db.dialect === 'sqlite') {
  sequelize = new Sequelize(db.database, db.username, db.password, {
    dialect: db.dialect,
    storage: db.storage
  });
} else {
  sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect
  });
}

module.exports = sequelize;
