const { Order } = require("../orders/order.model");
const { Customer } = require("../customers/customer.model");
const asyncMiddleware = require("../../middlewares/async");

module.exports = {
  createOrder: asyncMiddleware(async (req, res) => {
    console.log("Order Controller ", req.cart);
    const errors = {};
    const cart = req.cart.items;

    if (cart.length === 0) {
      errors.empty = "Cart is empty";
      return res.status(400).json(errors);
    }
    const customer = await Customer.findOne({ user: req.user._id }).select(
      "_id"
    );
    if (!customer) {
      errors.notFound = "Customer not found";
      return res.status(400).json(errors);
    }

    const order = new Order({
      customer: customer._id,
      items: cart,
      paymentId: Math.random().toString(),
    });

    await order.save();
    res.status(200).json(order);
  }),
  list: asyncMiddleware(async (req, res) => {
    const userId = req.user._id;

    const orders = await Order.find({ customer: userId }).lean();

    res.status(200).json(orders);
  }),

  adminList: asyncMiddleware(async (req, res) => {
    const orders = await Order.find({}).lean();

    res.status(200).json(orders);
  }),
};
