const express = require('express');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
