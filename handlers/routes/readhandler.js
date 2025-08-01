const handler = {};
const lib = require("../../lib/data");

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

handler._read = {};
handler._read.get = (reqProp, callback) => {
  // Check if ID is provided in query
  if (reqProp.queryStringObj.id) {
    const id =
      typeof reqProp.queryStringObj.id === "string" &&
      !isNaN(parseInt(reqProp.queryStringObj.id)) &&
      parseInt(reqProp.queryStringObj.id) > 0
        ? parseInt(reqProp.queryStringObj.id)
        : false;

    if (id) {
      // Get specific todo by ID
      lib.read("data", "data", (err, data) => {
        if (!err && data) {
          const todos = typeof data === "string" ? JSON.parse(data) : data;
          const todo = todos.find((item) => item.id === id);
          if (todo) {
            callback(200, todo);
          } else {
            callback(404, {
              error: "To-do not found",
            });
          }
        } else {
          callback(500, {
            error: "Error reading data",
          });
        }
      });
    } else {
      callback(400, {
        error: "Invalid ID format",
      });
    }
  } else {
    // Get all todos
    lib.read("data", "data", (err, data) => {
      if (!err && data) {
        const todos = typeof data === "string" ? JSON.parse(data) : data;
        callback(200, todos);
      } else {
        callback(500, {
          error: "Error reading data",
        });
      }
    });
  }
};

module.exports = handler;