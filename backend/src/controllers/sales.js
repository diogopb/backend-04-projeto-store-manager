const salesService = require('../services/sales');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  res.json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.json(sale);
};

module.exports = { getAllSales, getSaleById };
