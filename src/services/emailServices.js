const transport = require("../utils/emailTransport");
const envVariables = require("../constants/index");

const sendVerificationEmail = (email, otp, firstName) => {
  const mailOptions = {
    from: envVariables.USER_EMAIL,
    to: email,
    subject: "Purecheck Account Verification",
    html: `<p>Dear ${firstName},</p>
    <p></p>
    <p>Welcome to PureCheck!</p>
    <p></p>
    <p>To ensure the security of your account and protect your data, we need to verify your email address. Please use the following One-Time Password (OTP) to complete the verification process:</p>
    <p></p>
    <p style="text-align:center;"><span style="font-size: 36px;"><strong>${otp}</strong></span></p>
    <p></p>
    <p>Please enter this OTP within the PureCheck website to verify your account.&nbsp;</p>
    <p></p>
    <p>If you didn't request this verification or have any questions, please contact our support team at tonyetoffan@gmail.com.</p>
    <p></p>
    <p>Thank you for choosing PureCheck. We're excited to have you onboard!</p>`,
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
