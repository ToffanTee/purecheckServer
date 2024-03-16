const contactUs = require("../models/contactUsModel");
const { sendContactUsEmail } = require("../services/emailServices");

const contactUsForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendContactUsEmail(name, email, message);
    return res.status(200).json({ message: "Thank you for contacting us" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = contactUsForm;
