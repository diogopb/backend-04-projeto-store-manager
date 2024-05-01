const salesModel = require('../models/sales');

const getAllSales = async () => salesModel.getAllSales();
const getSaleById = async (id) => salesModel.getSaleById(id);

module.exports = { getAllSales, getSaleById };
