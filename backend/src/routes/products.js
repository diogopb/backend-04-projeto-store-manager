const { Router } = require('express');
const productsController = require('../controllers/products');

const productsRouter = Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);

module.exports = productsRouter;
