const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireSignin = (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).send({ error: "You must be signed in" });
  }

  // call back to verify auth token
  jwt.verify(authToken, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(403).json({ error: "Invalid token!" });
    } else {
      //append user payload to request object to be accessible
      //on our request controllers function
      req.user = payload;
      next();
    }
  });
};

module.exports = requireSignin;
