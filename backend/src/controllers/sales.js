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

const createSale = async (req, res) => {
  const sale = req.body;
  const newSale = await salesService.createSale(sale);

  res.status(201).json(newSale);
};

module.exports = { getAllSales, getSaleById, createSale };
