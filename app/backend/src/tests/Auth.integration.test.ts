import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user'

chai.use(chaiHttp);

const { expect, request } = chai;

const dumpUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const dumpUserRequest = {
  "email": 'admin@admin.com',
  "password": 'secret_admin'
}

describe('/clinics', () => {
  describe('POST', () => {

    before(() => {
      sinon.stub(User, 'findOne').resolves({ id: 1, ...dumpUser } as User)
    });

    after(() => {
      sinon.restore();
    });

    it('Return token and status 200 if valid user', async () => {
      const response = await chai.request(app).post('/login').send(dumpUserRequest);
      // console.log(response);
      
      
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.have.property('token');
    });
  })
});
