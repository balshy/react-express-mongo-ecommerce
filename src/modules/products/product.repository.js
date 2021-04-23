const { Product } = require("./product.model");

module.exports = {
  findOne: async (query) => {
    const product = await Product.findOne(query.match)
      .populate(query.populate)
      .select(query.select);

    return product;
  },

  find: async (query) => {
    const product = await Product.find(query.match)
      .populate(query.populate)
      .select(query.select)
      .skip(query.skip)
      .limit(query.limit);

    return product;
  },

  create: async (product) => {
    const product = new Product(product);

    return product;
  },
};
