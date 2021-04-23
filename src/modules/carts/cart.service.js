const { JWT_SECRET_CART } = require("../../config/keys");
const JWT = require("jsonwebtoken");
const { Cart } = require("./cart.class");

const signTokenCart = (items) => {
  return JWT.sign(
    {
      items,
      iat: new Date().getTime(),
      exp: new Date().setSeconds(3600),
    },
    JWT_SECRET_CART
  );
};

module.exports = {
  addItemCart: async (productId, cart) => {
    const errors = {};
    const _id = req.value.params;
    let cart =
      Object.keys(req.cart.items).length > 0 ? req.cart.items.cart : [];

    cart = new Cart(cart);
    
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
  },
};
