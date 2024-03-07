const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    NAFDAC_NO: { type: String, required: true },
    company: String,

    productCode: String,

    items: [],
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
