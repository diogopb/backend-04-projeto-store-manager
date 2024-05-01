const productsController = {
  getAllProducts: async () => [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
  ],
  getProductById: async (req) => {
    const productId = req.params.id;
    if (productId === '1') {
      return { id: 1, name: 'Martelo de Thor' };
    }
    return null;
  },
};

module.exports = productsController;
