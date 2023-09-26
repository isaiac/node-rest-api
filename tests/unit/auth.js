const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const server = require('../../server');

const {
  generatePasswordResetToken,
  generateVerificationToken
} = require('../../services/auth');

chai.use(chaiHttp);

/* eslint no-undef: 'off' */

describe('Auth', () => {
  describe('Register', () => {
    describe('/POST register', () => {
      it('it should register an user', (done) => {
        const data = {
          name: 'New',
          email: 'new@example.com',
          username: 'new',
          password: 'changeme.123',
          password_confirmation: 'changeme.123'
        };

        chai
          .request(server)
          .post('/auth/register')
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

  describe('Verification', () => {
    describe('/POST verification', () => {
      it('it should send a verification email', (done) => {
        const data = {
          email: 'user@example.com'
        };

        chai
          .request(server)
          .post('/auth/verification')
          .send(data)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.ACCEPTED);

            done();
          });
      });
    });

    describe('/PATCH verification', () => {
      it('it should verify an user', (done) => {
        const data = {
          token: generateVerificationToken('user@example.com')
        };

        chai
          .request(server)
          .patch('/auth/verification')
          .send(data)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.NO_CONTENT);

            done();
          });
      });
    });
  });

  describe('Password', () => {
    describe('/POST password', () => {
      it('it should send a password reset email', (done) => {
        const data = {
          email: 'user@example.com'
        };

        chai
          .request(server)
          .post('/auth/password')
          .send(data)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.ACCEPTED);

            done();
          });
      });
    });

    describe('/PATCH password', () => {
      it("it should change an user's password", (done) => {
        const data = {
          token: generatePasswordResetToken('user@example.com'),
          password: 'changeme.123',
          password_confirmation: 'changeme.123'
        };

        chai
          .request(server)
          .patch('/auth/password')
          .send(data)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.NO_CONTENT);

            done();
          });
      });
    });
  });

  describe('Login', () => {
    describe('/POST login', () => {
      it('it should login an user', (done) => {
        const data = {
          login: 'user@example.com',
          password: 'changeme.123'
        };

        chai
          .request(server)
          .post('/auth/login')
          .send(data)
          .end((_, res) => {
            chai.expect(res).to.have.status(StatusCodes.OK);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('access_token');

            done();
          });
      });
    });
  });
});
