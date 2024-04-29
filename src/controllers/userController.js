const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { getUserByEmail, getCurrentUser } = require("../services/userServices");
const generateOTP = require("../utils/otpGenerator");
const {
  sendVerificationEmail,
  sendForgotPasswordEmail,
} = require("../services/emailServices");

// CREATE A NEW USER
const createUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password } = req.body;

  try {
    const userExist = await getUserByEmail(email); // checks if user has already onboarded

    if (userExist) {
      if (userExist.isVerified) {
        return res
          .status(403)
          .json({ error: "User with this email already exists." });
      }

      if (!userExist.isVerified) {
        // handle account verification
        sendVerificationEmail(
          userExist.email,
          userExist.verificationToken,
          userExist.firstName
        );

        return res.status(200).json({
          message: `Please follow the instructions in your email ${userExist?.email} to verify your account.`,
        });
      }
    }

    // generate OTP
    const verificationToken = generateOTP();

    // hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating a new user here
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      verificationToken,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "User creation failed." });
    }

    // handle account verification
    sendVerificationEmail(newUser.email, verificationToken, firstName);

    return res.status(200).json({
      message:
        "Signup success! Please follow the instructions in your email to verify your account.",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Verify user account
const verifyUserAccount = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    const userToVerify = await User.findOne({ verificationToken });
    if (!userToVerify) {
      return res.status(404).json({ error: "Invalid token" });
    }

    const twentyFourHoursInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (+new Date() - +userToVerify.createdAt >= twentyFourHoursInMs) {
      await User.findByIdAndDelete(userToVerify._id);
      return res.status(400).json({ error: "Invalid token" });
    }
    // if (+new Date() - +userToVerify.createdAt >= 0) {
    //   await User.findByIdAndDelete(userToVerify._id);
    //   return res.status(400).json({ error: "Invalid token" });
    // }

    userToVerify.isVerified = true;
    userToVerify.verificationToken = undefined;

    await userToVerify.save();

    return res.status(200).json({ message: "Account verified successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong with usser verification" });
  }
};

//FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || !user.isVerified) {
      return res.status(404).json({ error: "User not found or not verified." });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to the user's document in the database (You may need to add an OTP field to your User model)
    user.passwordResetToken = otp;
    user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send OTP to the user's email
    sendForgotPasswordEmail(user.email, otp, user.firstName);

    return res.status(200).json({
      message: `An OTP has been sent to ${user.email}. Please check your email and enter the OTP to reset your password.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || !user.isVerified) {
      return res.status(404).json({ error: "User not found or not verified." });
    }

    // Check if OTP matches
    if (
      otp !== user.passwordResetToken ||
      Date.now() > user.passwordResetExpires
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Check if newPassword matches confirmNewPassword
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Hash the new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.user; // querying database for the logged in user's id

  try {
    const user = await getCurrentUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong fetching user by id." });
  }
};

module.exports = {
  createUser,
  verifyUserAccount,
  forgotPassword,
  resetPassword,
  getUserById,
};
