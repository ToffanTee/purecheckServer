const transport = require("../utils/emailTransport");
const generateOTP = require("../utils/otpGenerator");
const envVariables = require("../constants/index");

const sendVerificationEmail = (email) => {
  const otp = generateOTP();
  const mailOptions = {
    from: "info.webdevblog@gmail.com",
    to: "etosin70@gmail.com",
    subject: "Purecheck Account Verification",
    html: `<h1>${otp}</h1>`,
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent successfully");
    }
  });
};

module.exports = { sendVerificationEmail };
