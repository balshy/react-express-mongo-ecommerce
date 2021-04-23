const express = require("express");
const router = express.Router();
const { getCategories, getCategoryById } = require("./category.controller");
const { validateParamId, schemas } = require("../../middlewares/validator");

router.get("/", getCategories);
router.get("/:id", validateParamId(schemas.id), getCategoryById);

module.exports = router;
