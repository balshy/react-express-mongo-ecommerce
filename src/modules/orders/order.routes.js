const express = require("express");
const router = express.Router();
const { createOrder, list, adminList } = require("./order.controller");
const { tokenCartItems } = require("../../middlewares/cartToken");
const { auth, admin } = require("../../middlewares/authorization");

router.post("/", [auth, tokenCartItems], createOrder);
router.post("/", [auth], list);
router.post("/", [admin], adminList);

module.exports = router;
