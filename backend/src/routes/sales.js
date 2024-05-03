const { Router } = require('express');
const salesController = require('../controllers/sales');
const {
  productIsRequired,
  quantityIsRequired,
  // productIdNonexistent,
  variousProductsIdNonexistent,
} = require('../middlewares/sales');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSaleById);
salesRouter.post(
  '/',
  productIsRequired,
  quantityIsRequired,
  // productIdNonexistent,
  variousProductsIdNonexistent,
  salesController.createSale,
);

module.exports = salesRouter;
