const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const { createUser } = require("../controllers/userController");
const { validateUserModelData } = require("../middlewares/userModelValidator");
const router = express.Router();

router.post("/users", validateUserModelData, createUser);

module.exports = router;
