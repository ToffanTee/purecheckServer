const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUserByEmail } = require("../services/userServices");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User email does not exist!" });
    }

    //compare the entered password with the hashed password in database
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      return res.status(403).json({ error: "Invalid password!" });
    }

    // jsonwebtoken payload data
    const payload = {
      email: user.email,
      id: user._id,
    };

    // jsonwebtoken SECRET
    const SECRET = process.env.JWT_SECRET;

    // jsonwebtoken expiration period
    const expiresIn = 36000;

    // sign jsonwebtoken with jwt library
    const authToken = jwt.sign(payload, SECRET, { expiresIn });

    // cookie options object
    const cookieOptions = {
      expires: "36000",
      maxAge: 59 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .cookie("authToken", authToken, cookieOptions)
      .json({ message: "Login successful.", authToken });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { userLogin };
