const handler = {};
const lib = require("../../lib/data");

// Routes GET requests
handler.readhandler = (reqProp, callback) => {
  const acceptedMethods = ["get"];
  if (acceptedMethods.includes(reqProp.method)) {
    handler._read[reqProp.method](reqProp, callback);
  } else {
    callback(405, {
      error: "Method not allowed",
    });
    return;
  }
};

// Private methods container
handler._read = {};

// Handles GET operations
handler._read.get = (reqProp, callback) => {
  // Check query ID
  if (reqProp.queryStringObj.id) {
    // Validate ID format
    const id =
      typeof reqProp.queryStringObj.id === "string" &&
      !isNaN(parseInt(reqProp.queryStringObj.id)) &&
      parseInt(reqProp.queryStringObj.id) > 0
        ? parseInt(reqProp.queryStringObj.id)
        : false;

    if (id) {
      // Read single todo
      lib.read("data", "data", (err, data) => {
        if (!err && data) {
          // Parse and find
          const todos = typeof data === "string" ? JSON.parse(data) : data;
          const todo = todos.find((item) => item.id === id);
          if (todo) {
            // Return found todo
            callback(200, todo);
          } else {
            // Not found response
            callback(404, {
              error: "To-do not found",
            });
          }
        } else {
          // Read error response
          callback(500, {
            error: "Error reading data",
          });
        }
      });
    } else {
      // Invalid ID response
      callback(400, {
        error: "Invalid ID format",
      });
    }
  } else {
    // Read all todos
    lib.read("data", "data", (err, data) => {
      if (!err && data) {
        // Return all todos
        const todos = typeof data === "string" ? JSON.parse(data) : data;
        callback(200, todos);
      } else {
        // Read error response
        callback(500, {
          error: "Error reading data",
        });
      }
    });
  }
};

module.exports = handler;