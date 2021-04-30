const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByCategory,
  createOrUpdateProduct,
  getProductByIdToEdit,
  deleteProduct,
} = require("./product.controller");
const {
  validateBody,
  validateParamId,
  schemas,
} = require("../../middlewares/validator");
const { validateProduct } = require("./product.model");

const {
  auth,
  admin,
  adminOrSeller,
} = require("../../middlewares/authorization");

router.get("/", getProducts);
router.get("/:id", validateParamId(schemas.id), getProductById);
router.get("/categories/:category", getProductByCategory);

// *********** admin ******
router.post(
  "/",
  [validateBody(validateProduct.product), auth, adminOrSeller],
  createOrUpdateProduct
);
router.get(
  "/:id",
  [validateParamId(schemas.id), auth, adminOrSeller],
  getProductByIdToEdit
);
router.delete(
  "/:id",
  [validateParamId(schemas.id), auth, admin],
  deleteProduct
);
module.exports = router;
