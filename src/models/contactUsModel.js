const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactUsSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const contactUs = mongoose.model("contactUs", contactUsSchema);

module.exports = contactUs;
