const db = {
  Permission: require('./permission'),
  PermissionRole: require('./permission-role'),
  PermissionUser: require('./permission-user'),
  Role: require('./role'),
  RoleUser: require('./role-user'),
  User: require('./user')
};

Object.keys(db).forEach((modelName) => {
  db[modelName].associate(db);
});

module.exports = db;
