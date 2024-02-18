const User = require("../models/userModel");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  // Finding a user with the provided email

  // If user is found, return the user object
  if (user) {
    return user;
  }
};

const getCurrentUser = async (userId) => {
  const user = await User.findOne({ _id: userId })
    .select("-password")
    .select("-__v"); // Finding a user with the provided userId, excluding password and version fields

  if (user) {
    return user;
  } // If user is found, return the user object
};

module.exports = { getUserByEmail, getCurrentUser };
