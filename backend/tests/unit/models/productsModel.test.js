const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/config/connection');
const productsModel = require('../../../src/models/products');
const { product, products } = require('../mocks/products');

describe('test model', function () {
  describe('test getAllProducts', function () {
    it('returns an array', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productsModel.getAllProducts();

      expect(result).to.be.an('array');
    });

    it('returns the expected array', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productsModel.getAllProducts();

      expect(result).to.be.deep.equal(products);
    });
  });

  describe('test getProductById', function () {
    it('returns an object with valid id', async function () {
      sinon.stub(connection, 'execute').resolves([product]);
      const result = await productsModel.getProductById(1);

      expect(result).to.be.an('object');
      expect(result.id).to.equal(1);
      expect(result.name).to.equal('Martelo de Thor');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
