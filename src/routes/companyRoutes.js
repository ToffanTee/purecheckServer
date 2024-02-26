const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const {
  createCompany,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/product/create", requireSignin, createProduct);
router.post("/company/create", requireSignin, createCompany);

module.exports = router;
