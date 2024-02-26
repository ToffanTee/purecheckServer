const nodemailer = require("nodemailer");
const envVariables = require("../constants/index");

const transport = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false,
  auth: {
    user: "info.webdevblog@gmail.com",
    pass: "BC04B29915601B48E4121514B715A297D3E0",
  },
});

module.exports = transport;
