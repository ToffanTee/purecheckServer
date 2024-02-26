const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const { userLogin, LogoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", userLogin);

router.post("/logout", requireSignin, LogoutUser);

module.exports = router;
