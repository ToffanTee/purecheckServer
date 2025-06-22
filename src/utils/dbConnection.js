// const mongoose = require("mongoose");
// const envVariables = require("../constants/index");

// const connectDatabase = async () => {
//   await mongoose
//     .connect(envVariables.DB_URI)
//     .then(() => console.log("Database connected successfully"))
//     .catch((error) => console.log("Database connection failed"));
// };

// module.exports = connectDatabase;

const mongoose = require('mongoose');
const envVariables = require("../constants/index");

mongoose.connect(process.envVariables.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => {
  console.error('❌ Database connection failed!');
  console.error(err.message);  // <--- shows real reason
});

module.exports = connectDatabase;
