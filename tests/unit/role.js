const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const server = require('../../server');

const User = require('../../models/user');

const { generateAccessToken } = require('../../services/auth');

chai.use(chaiHttp);

/* eslint no-undef: 'off' */

describe('Roles', () => {
  describe('/GET roles', () => {
    it('it should GET all roles', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        chai
          .request(server)
          .get('/roles')
          .set('Authorization', `Bearer ${accessToken}`)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.OK);
            chai.expect(res.body).to.be.a('array');

            done();
          });
      });
    });
  });

  describe('/POST roles', () => {
    it('it should POST a role', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const data = {
          name: 'test',
          permissions: ['add-users', 'edit-users', 'delete-users']
        };

        chai
          .request(server)
          .post('/roles')
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

  describe('/GET/:id roles', () => {
    it('it should GET a role by the given id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const roleId = 'test';

        chai
          .request(server)
          .get(`/roles/${roleId}`)
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

  describe('/PUT/:id roles', () => {
    it('it should UPDATE a role given the id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const roleId = 'test';

        const data = {
          name: 'test',
          permissions: ['add-users', 'edit-users', 'delete-users']
        };

        chai
          .request(server)
          .put(`/roles/${roleId}`)
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

  describe('/DELETE/:id roles', () => {
    it('it should DELETE a role given the id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const roleId = 'test';

        chai
          .request(server)
          .delete(`/roles/${roleId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.NO_CONTENT);

            done();
          });
      });
    });
  });
});
