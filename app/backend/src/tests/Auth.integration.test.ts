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

const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NDgzMDMxMSwiZXhwIjoxNjY0OTE2NzExfQ.eTu7U_DQyeGdTS7fmzAqZJa-zDgW5pGW_wlyj3AH4p4";


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

    it('Return a correct role and status 200 if valid token', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', tokenTest);
      
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.be.deep.equal({role:dumpUser.role});
    });
  })
});
