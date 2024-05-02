const connection = require('../config/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS s
    ON sp.sale_id = s.id`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS s
      ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`,
    [id],
  );
  return sale;
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );
  return { insertId };
};

const insertSalesProducts = async (saleId, salesData) => {
  const promises = salesData.map(async (item) => {
    const { productId, quantity } = item;
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    );
    return { productId, quantity };
  });
  return Promise.all(promises);
};

const createSale = async (salesData) => {
  const { insertId } = await insertSale();
  const salesProducts = await insertSalesProducts(insertId, salesData);
  return { id: insertId, itemsSold: salesProducts };
};

module.exports = { getAllSales, getSaleById, createSale };
