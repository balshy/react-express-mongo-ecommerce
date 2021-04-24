const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  deleteCategory,
  createOrUpdateCategory,
} = require("./category.controller");
const {
  validateParamId,
  schemas,
  validateBody,
} = require("../../middlewares/validator");

const { auth, admin } = require("../../middlewares/authorization");

const { validateCategory } = require("./category.model");

router.get("/", getCategories);
router.get("/:id", validateParamId(schemas.id), getCategoryById);

// private routes
// **** admin ****
router.post(
  "/",
  [validateBody(validateCategory.category), auth, admin],
  createOrUpdateCategory
);
router.delete(
  "/:id",
  [validateParamId(schemas.id), auth, admin],
  deleteCategory
);

module.exports = router;
