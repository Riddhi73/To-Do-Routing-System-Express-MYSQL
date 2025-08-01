const handler = {};
const lib = require("../../lib/data");

// Routes HTTP methods
handler.createHandler = (reqProp, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.includes(reqProp.method)) {
    handler._create[reqProp.method](reqProp, callback);
  } else {
    callback(405, {
      error: "Method not allowed",
    });
    return;
  }
};

// Private methods container
handler._create = {};

// Creates new todo
handler._create.post = (reqProp, callback) => {
  // Validate ID
  const id =
    typeof reqProp.body.id === "number" && reqProp.body.id > 0
      ? reqProp.body.id
      : false;

  // Validate title
  const title =
    typeof reqProp.body.title === "string" &&
    reqProp.body.title.trim().length > 0
      ? reqProp.body.title.trim()
      : false;

  // Validate description
  const description =
    typeof reqProp.body.description === "string" &&
    reqProp.body.description.trim().length > 0
      ? reqProp.body.description.trim()
      : false;

  // Validate date
  const date =
    typeof reqProp.body.date === "string" && reqProp.body.date.trim().length > 0
      ? reqProp.body.date.trim()
      : false;

  // Save if valid
  if (id && title && description && date) {
    let newData = { id, title, description, date };
    // Store todo data
    lib.create("data", "data", newData, (err) => {
      if (!err) {
        callback(201, { message: "To-do created", data: newData });
      } else {
        callback(500, { error: `Error creating resource ${err}` });
      }
    });
  } else {
    // Return validation errors
    callback(400, {
      error: `Missing required fields: ${!id ? "id" : ""} ${
        !title ? "title" : ""
      } ${!description ? "description" : ""} ${!date ? "date" : ""}`,
    });
    return;
  }
};

module.exports = handler;
