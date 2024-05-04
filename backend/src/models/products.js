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

const createProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [result] = await connection.execute(query, [name]);
  return result.insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [
    name,
    id,
  ]);
  return { id, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
