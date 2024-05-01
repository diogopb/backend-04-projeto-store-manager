const chai = require('chai');
const sinonChai = require('sinon-chai');
const app = require('../../../src/app');
const salesService = require('../../../src/services/sales');

const { expect } = chai;
chai.use(sinonChai);

describe('test controller', function () {
  it('invalid id', async function () {
    salesService.getSaleById = async () => null;

    const res = await chai.request(app).get('/sales/99');

    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('Sale not found');
  });
});
