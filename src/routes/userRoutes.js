const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const {
  createUser,
  verifyUserAccount,
  getUserById,
} = require("../controllers/userController");
const { validateUserModelData } = require("../middlewares/userModelValidator");
const router = express.Router();

router.post("/users", validateUserModelData, createUser);
router.post("/users/verify-account", verifyUserAccount);
router.get("/users/me", requireSignin, getUserById);

module.exports = router;
