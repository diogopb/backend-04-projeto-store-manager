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

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  const created = await service.createProduct(name);

  res.status(201).json({ id: created, name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  const existingProduct = await service.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updated = await service.updateProduct(id, name);

  res.json(updated);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const existingProduct = await service.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await service.deleteProduct(id);
  res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
