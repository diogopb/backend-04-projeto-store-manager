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

module.exports = { getAllProducts, getProductById, createProduct };
