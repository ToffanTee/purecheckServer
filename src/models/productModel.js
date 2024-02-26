const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    NAFDAC_NO: { type: String, required: true },
    company: {
      companyName: String,
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    }, // databse association
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
