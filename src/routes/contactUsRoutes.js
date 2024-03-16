const express = require("express");
const contactUsForm = require("../controllers/contactUsController");

const router = express.Router();

router.post("/contact-us", contactUsForm);

module.exports = router;
