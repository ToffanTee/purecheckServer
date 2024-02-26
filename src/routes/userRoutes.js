const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const { createUser, getUserById } = require("../controllers/userController");
const { validateUserModelData } = require("../middlewares/userModelValidator");
const router = express.Router();

router.post("/users", validateUserModelData, createUser);
router.get("/users/me", requireSignin, getUserById); // 로그인한 유

module.exports = router;
