const product = require("../models/productModel");
const company = require("../models/companyModel");

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
  const { name, description, NAFDAC_NO, company: companyName } = req.body;
  try {
    const companyExist = await company.findOne({ name: companyName });

    if (!companyExist) {
      return res.status(400).json({ error: "company does not exist" });
    }
    const newProduct = new product({
      name,
      description,
      NAFDAC_NO,
      company: { companyName: companyExist.name, companyId: companyExist._id },
    });

    await newProduct.save();

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

module.exports = { createCompany, createProduct };
