const salesModel = require('../models/sales');

const getAllSales = async () => salesModel.getAllSales();
const getSaleById = async (id) => salesModel.getSaleById(id);
const createSale = async (sale) => salesModel.createSale(sale);

module.exports = { getAllSales, getSaleById, createSale };
