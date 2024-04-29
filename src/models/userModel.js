const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: String, // Store OTP
    passwordResetExpires: Date, // Store OTP expiration time
    verificationToken: String,
    // verified: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
