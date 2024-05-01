const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/config/connection');
const { sales } = require('../mocks/sales');

chai.use(chaiHttp);
const { expect } = chai;

describe('test', function () {
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves([sales]);
  });

  afterEach(function () {
    connection.execute.restore();
  });

  it('return all sales', async function () {
    const response = await chai.request(app).get('/sales');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(sales);
  });
});
