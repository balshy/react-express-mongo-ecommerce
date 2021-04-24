const errorMiddleware = require("../middlewares/error");

const authRoute = require("../modules/users/user.routes");
const categoryRoute = require("../modules/categories/category.routes");
const customerRoute = require("../modules/customers/customer.routes");
const productRoute = require("../modules/products/product.routes");
const cartRoute = require("../modules/carts/cart.routes");
const paymentRoute = require("../modules/payments/payment.routes");
const orderRoute = require("../modules/orders/order.routes");

module.exports = (app) => {
  app.use("/api/users", authRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/customers", customerRoute);
  app.use("/api/products", productRoute);
  app.use("/api/shopping-cart", cartRoute);
  app.use("/api/payments", paymentRoute);
  app.use("/api/orders", orderRoute);
  app.use(errorMiddleware);
};
