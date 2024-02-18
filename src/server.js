const http = require("http");
const app = require("./app");
const connectDatabase = require("./utils/dbConnection");
const envVariables = require("./constants/index");
const httpServer = http.createServer(app);

const { PORT } = envVariables;

const startServer = async () => {
  await connectDatabase();

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
