const { Router } = require('express');
const salesController = require('../controllers/sales');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSaleById);
salesRouter.post('/', salesController.createSale);

module.exports = salesRouter;
