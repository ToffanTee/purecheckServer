const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: { type: String },
    isSubscribed: { type: Boolean, default: true },
    subscribedDate: { type: Date, default: Date.now() },
    subExpiryDate: { type: Date, default: Date.now() },
    subscriptionType: {
      type: String,
      enum: ["Monthly", "Quateryly", "Annually"],
    },
    createdBy: String,
  },
  { timestamps: true }
);

const company = mongoose.model("company", companySchema);

module.exports = company;
