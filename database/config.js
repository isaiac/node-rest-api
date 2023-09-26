const {
  DB_DATABASE = 'db',
  DB_DIALECT = 'postgres',
  DB_HOST = 'localhost',
  DB_MIGRATIONS_TABLE_NAME = 'migrations',
  DB_PASSWORD = '',
  DB_PORT = 5432,
  DB_STORAGE = 'database.sqlite',
  DB_USERNAME = 'root'
} = process.env;

module.exports = {
  development: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    migrationStorageTableName: DB_MIGRATIONS_TABLE_NAME
  },
  test: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: 'sqlite',
    storage: DB_STORAGE,
    migrationStorageTableName: DB_MIGRATIONS_TABLE_NAME
  },
  staging: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    migrationStorageTableName: DB_MIGRATIONS_TABLE_NAME
  },
  production: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    migrationStorageTableName: DB_MIGRATIONS_TABLE_NAME
  }
};
