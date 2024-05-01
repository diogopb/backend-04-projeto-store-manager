const connection = require('../config/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product[0];
};

module.exports = { getAllProducts, getProductById };
