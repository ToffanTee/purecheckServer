const product = require("../models/productModel");
const company = require("../models/companyModel");
const productCodeGenerator = require("../utils/productCodeGenerator");

const createCompany = async (req, res) => {
  const { name, subscriptionType } = req.body;
  try {
    const newCompany = new company({ name, subscriptionType });
    await newCompany.save();

    if (!newCompany) {
      return res.status(400).json({ error: "Company creation failed." });
    }

    return res
      .status(200)
      .json({ message: "Company created successfully!", newCompany });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong with creating new company." });
  }
};

const createProduct = async (req, res) => {
  const {
    name,
    description,
    NAFDAC_NO,
    company: companyName,
    productTotal,
    productCode,
  } = req.body;

  try {
    const companyExist = await company.findOne({ name: companyName });
    const productAlreadyExist = await product.findOne({ name });

    if (!companyExist) {
      return res.status(400).json({ error: "Company does not exist" });
    }

    if (productAlreadyExist) {
      return res.status(409).json({ error: "This product already exists!" });
    }

    const items = productCodeGenerator(productTotal, productCode); // generates a unique verification code for each product item

    const newProduct = new product({
      name,
      description,
      NAFDAC_NO,
      company: companyExist.name,
      items,
    });

    await newProduct.save();
    //add the newly created product to the companies products array

    if (!newProduct) {
      return res.status(400).json({ error: "Adding of product failed." });
    }

    return res
      .status(200)
      .json({ message: "Product added to company", newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong with product addition" });
  }
};

// update an existing product data
const updateProduct = async (req, res) => {
  const { name, productTotal, productCode } = req.body;
  const { productId } = req.params;

  try {
    const existingProduct = await product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // You can add further checks if you want to ensure that the product belongs to the specified company or not

    const items = productCodeGenerator(productTotal, productCode); // generates a unique verification code for each product item

    // Update existing product with new data
    existingProduct.name = name;

    existingProduct.items = [...existingProduct.items, ...items];

    await existingProduct.save();

    return res
      .status(200)
      .json({ message: "Product updated", updatedProduct: existingProduct });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong with product update" });
  }
};

const getAllProductsByCompany = async (req, res) => {
  const { companyName } = req.params;
  try {
    const products = await product.find({
      $or: [{ company: { $regex: companyName } }],
    });

    return res
      .status(200)
      .json({ message: "Products fetched successfully!", products });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

// product validation fucntion
const validateProduct = async (req, res) => {
  const { name, itemCode } = req.body;

  try {
    const productCheck = await product.findOne({ name });

    if (!productCheck) {
      return res.status(404).json({ error: "Product does not exist" });
    }

    const checkCodeExist = productCheck.items.findIndex(
      (prod) => prod === itemCode
    );

    if (checkCodeExist === -1) {
      return res.status(400).json({ error: "Invalid item code!" });
    }
    productCheck.items.splice(checkCodeExist, 1);
    await productCheck.save();
    return res.status(200).json({ message: "Validation successful!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong validating product" });
  }
};

module.exports = {
  createCompany,
  createProduct,
  updateProduct,
  validateProduct,
  getAllProductsByCompany,
};
