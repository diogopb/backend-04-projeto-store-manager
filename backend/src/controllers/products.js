const service = require('../services/products');

const getAllProducts = async (_req, res) => {
  const products = await service.getAllProducts();

  res.json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await service.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const created = await service.createProduct(name);

  res.status(201).json({ id: created, name });
};

module.exports = { getAllProducts, getProductById, createProduct };
