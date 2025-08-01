const handler = {};
const lib = require("../../lib/data");

// Private methods container
handler._update = {};

// Route HTTP methods
handler.updateHandler = (reqProp, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.includes(reqProp.method)) {
    handler._update[reqProp.method](reqProp, callback);
  } else {
    callback(405, {
      error: "Method not allowed",
    });
    return;
  }
};

// Update todo item
handler._update.put = (reqProp, callback) => {
  // Validate ID
  const id =
    typeof reqProp.queryStringObj.id === "string" &&
    !isNaN(parseInt(reqProp.queryStringObj.id)) &&
    parseInt(reqProp.queryStringObj.id) > 0
      ? parseInt(reqProp.queryStringObj.id)
      : false;

  // Check title
  const title =
    typeof reqProp.body.title === "string" &&
    reqProp.body.title.trim().length > 0
      ? reqProp.body.title.trim()
      : false;

  // Check description
  const description =
    typeof reqProp.body.description === "string" &&
    reqProp.body.description.trim().length > 0
      ? reqProp.body.description.trim()
      : false;

  // Check date
  const date =
    typeof reqProp.body.date === "string" && reqProp.body.date.trim().length > 0
      ? reqProp.body.date.trim()
      : false;

  // Process update request
  if (id && (title || description || date)) {
    // Read existing data
    lib.read("data", "data", (err, data) => {
      if (!err && data) {
        // Clone data safely
        let todo = JSON.parse(JSON.stringify(data));
        // Find target todo
        const todoIndex = todo.findIndex((item) => item.id === id);
        if (todoIndex !== -1) {
          // Update fields
          if (title) todo[todoIndex].title = title;
          if (description) todo[todoIndex].description = description;
          if (date) todo[todoIndex].date = date;

          // Save changes
          lib.update("data", "data", todo, (err) => {
            if (!err) {
              callback(200, { message: "To-do updated successfully" });
            } else {
              callback(500, { error: `Error updating resource ${err}` });
            }
          });
        } else {
          callback(404, { error: "To-do not found" });
        }
      } else {
        callback(500, { error: `Error reading data ${err}` });
      }
    });
  } else {
    // Validation failed
    callback(400, {
      error: `Missing required fields: ${!id ? "id" : ""} ${
        !title ? "title" : ""
      } ${!description ? "description" : ""} ${!date ? "date" : ""}`,
    });
  }
};

// Export
module.exports = handler;
