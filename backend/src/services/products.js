const productsModel = require('../models/products');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const createProduct = async (name) => {
  const created = await productsModel.createProduct(name);
  return created;
};

const updateProduct = async (idParam, name) => {
  let id = idParam;
  id = Number(id);
  const updated = await productsModel.updateProduct(id, name);
  return updated;
};

const deleteProduct = async (id) => {
  const deleted = await productsModel.deleteProduct(id);
  return deleted;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
