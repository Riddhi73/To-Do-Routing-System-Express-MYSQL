// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/routes/notFoundHandler");
const { parse } = require("path");
const util = require("./util");
const handler = {};

// Main request handler
handler.handleReqRes = (req, res) => {
  // Parse URL components
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const queryStringObj = parsedUrl.query;
  const trimmedPath = pathName.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const headerObj = req.headers;

  // Collect request properties
  const reqProp = {
    parsedUrl,
    pathName,
    queryStringObj,
    trimmedPath,
    method,
    headerObj,
  };

  // Setup data decoder
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  // Choose route handler
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  // Handle incoming data chunks
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  // Process complete request
  req.on("end", () => {
    realData += decoder.end();
    reqProp.body = util.parseJson(realData);

    // Execute handler and send response
    chosenHandler(reqProp, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
