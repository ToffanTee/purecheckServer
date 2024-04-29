const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const {
  createUser,
  verifyUserAccount,
  forgotPassword,
  resetPassword,
  getUserById,
} = require("../controllers/userController");
const { validateUserModelData } = require("../middlewares/userModelValidator");
const router = express.Router();

router.post("/users", validateUserModelData, createUser);
router.post("/users/verify-account", verifyUserAccount);
router.post("/users/forgot-password", forgotPassword);
router.post("/users/reset-password", resetPassword);
router.get("/users/me", requireSignin, getUserById);

module.exports = router;
