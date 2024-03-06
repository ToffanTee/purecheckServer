const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const {
  createCompany,
  createProduct,
  updateProduct,
  validateProduct,
  getAllProductsByCompany,
} = require("../controllers/productController");

const router = express.Router();

router.post("/product/create", requireSignin, createProduct);
router.post("/company/create", requireSignin, createCompany);
router.put("/product/update/:productId", requireSignin, updateProduct);
router.post("/product/validate", validateProduct);
router.get(
  "/product/products-by-company/:companyName",
  getAllProductsByCompany
);

module.exports = router;
