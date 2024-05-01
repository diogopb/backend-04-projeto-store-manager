const chai = require('chai');
const sinonChai = require('sinon-chai');
const app = require('../../../src/app');
const productService = require('../../../src/services/products');

const { expect } = chai;
chai.use(sinonChai);

describe('test controller', function () {
  it('invalid id', async function () {
    productService.getProductById = async () => null;

    const res = await chai.request(app).get('/products/99');

    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('Product not found');
  });
});
