const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const createThread = require("../controllers/threadController");

const router = express.Router();

router.post("/create/thread", requireSignin, createThread);

module.exports = router;
