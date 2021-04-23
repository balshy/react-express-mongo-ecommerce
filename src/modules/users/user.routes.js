const express = require("express");
const router = express.Router();
const { register, login, secret } = require("./user.auth.controller");
const { validateBody } = require("../../middlewares/validator");
const { validateUser } = require("./user.model");

const { auth } = require("../../middlewares/authorization");

router.post("/register", validateBody(validateUser.register), register);
router.post("/login", validateBody(validateUser.login), login);

router.get("/secret", auth, secret);

module.exports = router;
