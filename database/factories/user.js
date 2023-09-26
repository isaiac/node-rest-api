const { faker } = require('@faker-js/faker');
const { factory } = require('factory-girl');

const UserStatus = require('../../enums/user-status');

const User = require('../../models/user');

factory.define('user', User, {
  id: () => faker.string.uuid(),
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  password: () => faker.internet.password({ length: 10 }),
  status: UserStatus.ACTIVE,
  email_verified_at: () => new Date(),
  created_at: () => new Date(),
  updated_at: () => new Date()
});

module.exports = factory;
