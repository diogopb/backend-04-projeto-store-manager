const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const connection = require('../../../src/config/connection');
const { products } = require('../mocks/products');

chai.use(chaiHttp);
const { expect } = chai;

describe('test', function () {
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  afterEach(function () {
    connection.execute.restore();
  });

  it('return all products', async function () {
    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(products);
  });
});
