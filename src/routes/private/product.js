const express = require("express");
const router = express.Router();
const {
  createOrUpdateProduct,
  deleteProduct,
  getProductByIdToEdit,
} = require("../../controllers/productController");
const {
  validateBody,
  validateParamId,
  schemas,
} = require("../../middlewares/validator");
const { validateProduct } = require("../../models/Product");
const {
  auth,
  admin,
  adminOrSeller,
} = require("../../middlewares/authorization");

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
