// Function to generate OTP
const generateOTP = () => {
  // Declare a digits variable
  // which stores all digits
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

module.exports = generateOTP;
