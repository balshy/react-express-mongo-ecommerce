const express = require("express");
const router = express.Router();
const { createOrder } = require("./order.controller");
const { tokenCartItems } = require("../../middlewares/cartToken");
const { auth } = require("../../middlewares/authorization");

router.post("/", [auth, tokenCartItems], createOrder);

module.exports = router;
