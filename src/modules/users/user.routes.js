const express = require("express");
const router = express.Router();
const {
  register,
  login,
  secret,
  list,
  update,
  remove,
} = require("./user.auth.controller");
const {
  validateBody,
  validateParamId,
  schemas,
} = require("../../middlewares/validator");

const { validateUser } = require("./user.model");

const { auth, admin } = require("../../middlewares/authorization");

router.get(
  "/",
  [
    auth, admin
  ],
  list
);

router.put("/:id", [auth, admin, validateBody(validateUser.edit)], update);
router.delete("/:id", [auth, admin, validateParamId(schemas.id)], remove);

router.post("/register", validateBody(validateUser.register), register);
router.post("/login", validateBody(validateUser.login), login);

router.get("/secret", auth, secret);

module.exports = router;
