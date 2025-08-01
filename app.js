// Load dependencies
const http = require("http");
const fs = require("fs");
const path = require("path");
const { handleReqRes } = require("./helpers/handleReqRes");
const enviroment = require("./helpers/environment");
const data = require("./lib/data");

// Test CRUD operations
// data.create("data", "newFile", { name: "test file" }, (err) => {
//   console.log(err);
// })

// data.read("data", "newFile", (err, data) => {
//   console.log(err, data);
// });

// data.update("data", "newFile", { name: "updated file" }, (err) => {
//   console.log(err);
// });

// data.delete("data", "newFile", (err) => {
//   console.log(err);
// });

// App container
const app = {};

// Initialize server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(enviroment.port, () => {
    console.log(`server is listeing on port ${enviroment.port} in ${enviroment.envName} mode`);
  });
};

// Route requests
app.handleReqRes = handleReqRes;

// Start server
app.createServer();
