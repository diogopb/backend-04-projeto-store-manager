const productModel = require('../models/products');

const productIsRequired = (req, res, next) => {
  const products = req.body;
  const valid = products.every((product) => 'productId' in product);

  if (!valid) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const quantityIsRequired = (req, res, next) => {
  const products = req.body;
  const valid = products.every((product) => 'quantity' in product);

  if (!valid) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (products.every((product) => product.quantity <= 0)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const productIdNonexistent = async (req, res, next) => {
  const { id } = req.params;
  const pId = await productModel.getProductById(id);

  if (!pId) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const variousProductsIdNonexistent = async (req, res, next) => {
  const products = req.body;
  const productsExistents = await Promise.all(
    products.map(async (product) => {
      const { productId } = product;
      const pId = await productModel.getProductById(productId);
      return pId;
    }),
  ).then((result) => result.every((pExist) => pExist));

  if (!productsExistents) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  productIsRequired,
  quantityIsRequired,
  productIdNonexistent,
  variousProductsIdNonexistent,
};
