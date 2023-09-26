const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const server = require('../../server');

const User = require('../../models/user');

const { generateAccessToken } = require('../../services/auth');

chai.use(chaiHttp);

/* eslint no-undef: 'off' */

describe('Permissions', () => {
  describe('/GET permissions', () => {
    it('it should GET all permissions', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        chai
          .request(server)
          .get('/permissions')
          .set('Authorization', `Bearer ${accessToken}`)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.OK);
            chai.expect(res.body).to.be.a('array');

            done();
          });
      });
    });
  });

  describe('/POST permissions', () => {
    it('it should POST a permission', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const data = { name: 'test' };

        chai
          .request(server)
          .post('/permissions')
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

  describe('/GET/:id permissions', () => {
    it('it should GET a permission by the given id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const permissionId = 'test';

        chai
          .request(server)
          .get(`/permissions/${permissionId}`)
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

  describe('/PUT/:id permissions', () => {
    it('it should UPDATE a permission given the id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const permissionId = 'test';

        const data = { name: 'test' };

        chai
          .request(server)
          .put(`/permissions/${permissionId}`)
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

  describe('/DELETE/:id permissions', () => {
    it('it should DELETE a permission given the id', (done) => {
      User.findByEmail('admin@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const permissionId = 'test';

        chai
          .request(server)
          .delete(`/permissions/${permissionId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.NO_CONTENT);

            done();
          });
      });
    });
  });
});
