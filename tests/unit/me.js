const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const server = require('../../server');

const User = require('../../models/user');

const { generateAccessToken } = require('../../services/auth');

chai.use(chaiHttp);

/* eslint no-undef: 'off' */

describe('Me', () => {
  describe('/GET me', () => {
    it('it should GET an authenticated user', (done) => {
      User.findByEmail('user@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        chai
          .request(server)
          .get('/me')
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

  describe('/PUT me', () => {
    it('it should UPDATE an authenticated user', (done) => {
      User.findByEmail('user@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        const data = {
          name: 'User',
          email: 'user@example.com',
          username: 'user',
          password: 'changeme.123',
          password_confirmation: 'changeme.123'
        };

        chai
          .request(server)
          .put('/me')
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

  describe('/DELETE me', () => {
    it('it should DELETE an authenticated user', (done) => {
      User.findByEmail('user@example.com').then((user) => {
        const accessToken = generateAccessToken(user.id);

        chai
          .request(server)
          .delete('/me')
          .set('Authorization', `Bearer ${accessToken}`)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.NO_CONTENT);

            done();
          });
      });
    });
  });
});
