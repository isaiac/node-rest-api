const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const server = require('../../server');

const User = require('../../models/user');

const { generateAccessToken } = require('../../services/auth');

chai.use(chaiHttp);

/* eslint no-undef: 'off' */

describe('Users', () => {
  describe('/GET users', () => {
    it('it should GET all users', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        chai
          .request(server)
          .get('/users')
          .set('Authorization', `Bearer ${accessToken}`)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.OK);
            chai.expect(res.body).to.be.a('array');

            done();
          });
      });
    });
  });

  describe('/POST users', () => {
    it('it should POST a user', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const data = {
          name: 'Test',
          email: 'test@example.com',
          username: 'test',
          password: 'changeme.123',
          password_confirmation: 'changeme.123',
          is_active: true,
          roles: ['admin'],
          permissions: ['add-users', 'edit-users', 'delete-users']
        };

        chai
          .request(server)
          .post('/users')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(data)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.CREATED);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('id');

            done();
          });
      });
    });
  });

  describe('/GET/:id users', () => {
    it('it should GET a user by the given id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        User.findByEmail('admin@example.com').then(({ id: userId }) => {
          chai
            .request(server)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .end((_, res) => {
              chai.expect(res).to.have.status(StatusCodes.OK);
              chai.expect(res.body).to.be.a('object');
              chai.expect(res.body).to.have.property('id');

              done();
            });
        });
      });
    });
  });

  describe('/PUT/:id users', () => {
    it('it should UPDATE a user given the id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        User.findByEmail('test@example.com').then(({ id: userId }) => {
          const data = {
            name: 'Test',
            email: 'test@example.com',
            username: 'test',
            password: 'changeme.123',
            password_confirmation: 'changeme.123',
            is_active: true,
            roles: ['admin'],
            permissions: ['add-users', 'edit-users', 'delete-users']
          };

          chai
            .request(server)
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(data)
            .end((_, res) => {
              chai.expect(res).to.have.status(StatusCodes.OK);
              chai.expect(res.body).to.be.a('object');
              chai.expect(res.body).to.have.property('id');

              done();
            });
        });
      });
    });
  });

  describe('/DELETE/:id users', () => {
    it('it should DELETE a user given the id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        User.findByEmail('test@example.com').then(({ id: userId }) => {
          chai
            .request(server)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .end((_, res) => {
              chai.expect(res).to.have.status(StatusCodes.NO_CONTENT);

              done();
            });
        });
      });
    });
  });
});
