const { Cart } = require("../carts/cart.class");
const { Product } = require("../products/product.model");
const asyncMiddleware = require("../../middlewares/async");

module.exports = {
  shoppingCart: asyncMiddleware(async (req, res) => {
    const errors = {};
    // const token = req.header('cart-items');
    const { token } = req.body;
    if (!token) {
      errors.notFound = "Token not found";
      return res.status(404).json(errors);
    }
    res.status(200).json(token);
  }),
  addItemCart: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    const cart = new Cart(
      Object.keys(req.cart.items).length > 0 ? req.cart.items.cart : []
    );
    const product = await Product.findById(_id).select([
      "name",
      "category.name",
      "price",
      "stock",
      "image",
      "discount",
    ]);
    if (!product) {
      errors.notFound = "Product not found";
      return res.status(400).json(errors);
    }
    if (product.stock === 0) {
      errors.notStock = "Product not in stock.";
      return res.status(400).json(errors);
    }
    cart.addItemCart(product);
    const token = signTokenCart(cart);
    //res.header("cart-items", token);
    res.status(200).json(token);
  }),
  updateAndRemoveItemCart: asyncMiddleware(async (req, res) => {
    const _id = req.value.params;
    const cart = new Cart(
      Object.keys(req.cart.items).length > 0 ? req.cart.items.cart : []
    );
    cart.removeItem(_id, "-");
    const token = signTokenCart(cart);
    //res.header("cart-items", token);
    res.status(200).json(token);
  }),
  removeItemCart: asyncMiddleware(async (req, res) => {
    const _id = req.value.params;
    const cart = new Cart(
      Object.keys(req.cart.items).length > 0 ? req.cart.items.cart : []
    );
    cart.removeItemCart(_id);
    const token = signTokenCart(cart);
    //res.header("cart-items", token);
    res.status(200).json(token);
  }),
  clearCart: asyncMiddleware(async (req, res) => {
    const cart = new Cart([]);
    cart.clearCart();
    const token = signTokenCart(cart);
    // res.header("cart-items", token);
    res.status(200).json(token);
  }),
};
