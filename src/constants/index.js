require("dotenv").config();

const envVariables = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  USER_EMAIL: process.env.USER_EMAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PASS: process.env.SMTP_PASS,
};

module.exports = envVariables;
