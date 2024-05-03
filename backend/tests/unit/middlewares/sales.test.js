const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productService = require('../../../src/services/products');
const {
  productIsRequired,
  quantityIsRequired,
  productIdNonexistent,
  variousProductsIdNonexistent,
} = require('../../../src/middlewares/sales');

const { expect } = chai;
chai.use(sinonChai);

describe('test middlewares', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('productIsRequired', function () {
    it('returns 400 if productId is not provided', async function () {
      const req = { body: [{ quantity: 1 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      // const next = sinon.spy();
      await productIsRequired(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });

    it('returns 400 if quantity is not provided', async function () {
      const req = { body: [{ productId: 1 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await quantityIsRequired(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required',
      });
    });

    it('returns 422 if quantity is less than 1', async function () {
      const req = { body: [{ productId: 1, quantity: 0 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await quantityIsRequired(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  describe('productIdNonexistent', function () {
    it('returns 404 if product does not exist', async function () {
      const req = { params: { id: 99 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      productService.getProductById = async () => null;
      await productIdNonexistent(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('variousProductsIdNonexistent', function () {
    it('returns 404 if any product does not exist', async function () {
      const req = { body: [{ productId: 99, quantity: 1 }] };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      productService.getProductById = async () => null;
      await variousProductsIdNonexistent(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
});
