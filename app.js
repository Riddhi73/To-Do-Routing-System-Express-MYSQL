// dependencies
const http = require("http");
const fs = require("fs");
const path = require("path");
const { handleReqRes } = require("./helpers/handleReqRes");
const enviroment = require("./helpers/environment");
const data = require("./lib/data");

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

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(enviroment.port, () => {
    console.log(`server is listeing on port ${enviroment.port} in ${enviroment.envName} mode`);
  });
};

//handle request response
app.handleReqRes = handleReqRes;

app.createServer();
