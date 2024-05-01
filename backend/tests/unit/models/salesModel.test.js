const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales');
const { sales, sale } = require('../mocks/sales');
const connection = require('../../../src/config/connection');

const { expect } = chai;

describe('test model', function () {
  describe('test getAllSales', function () {
    it('returns an array', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await salesModel.getAllSales();

      expect(result).to.be.an('array');
    });

    it('returns the expected array', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesModel.getAllSales();

      expect(result).to.be.deep.equal(sales);
    });
  });

  describe('test getSaleById', function () {
    it('returns an object with valid id', async function () {
      sinon.stub(connection, 'execute').resolves(sale);
      const result = await salesModel.getSaleById(1);

      expect(result).to.be.an('object');
      expect(result.date).to.equal('2021-09-09T04:54:29.000Z');
      expect(result.productId).to.equal(1);
      expect(result.quantity).to.equal(2);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
