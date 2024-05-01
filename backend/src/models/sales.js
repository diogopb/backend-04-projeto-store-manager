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

module.exports = { getAllSales, getSaleById };
