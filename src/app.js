const express = require("express");
const app = express();
const sanitize = require("perfect-express-sanitizer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoute");
const companyRoutes = require("./routes/companyRoutes");

// cors option object to establish handshake with client
const corsOptions = {
  origin: "http://localhost:3000", // frontend url
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various versions of Safari) choke on 204
  credentials: true,
};

app.use(cors(corsOptions)); // enable CORS for all domains

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", companyRoutes);

app.use(sanitize.clean({ xss: true, noSql: true, sql: true }));

module.exports = app;
