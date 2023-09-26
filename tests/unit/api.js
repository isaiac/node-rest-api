const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');

const server = require('../../server');

chai.use(chaiHttp);

/* eslint no-undef: 'off' */

describe('Api', () => {
  describe('/GET ping', () => {
    it('it should ping the api', (done) => {
      chai
        .request(server)
        .get('/ping')
        .end((_, res) => {
          chai.expect(res).to.have.status(StatusCodes.OK);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');

          done();
        });
    });
  });
});
