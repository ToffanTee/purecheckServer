const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { getUserByEmail, getCurrentUser } = require("../services/userServices");
// const { sendVerificationEmail } = require("../services/emailServices");

// CREATE A NEW USER
const createUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password } = req.body;

  try {
    const userExist = await getUserByEmail(email); // checks if user has already onboarded

    if (userExist) {
      return res
        .status(403)
        .json({ error: "User with this email already exists." });
    }

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
      // verified: false,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "User creation failed." });
    }
    // handle account verification
    // sendVerificationEmail(result, res);

    // sendVerificationEmail(newUser.email);

    return res.status(200).json({
      message: "Signup success! Please procedd to login.",
      data: newUser,
    });
  } catch (error) {
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

    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong fetching user by id." });
  }
};

module.exports = { createUser, getUserById };
