const handler = {};
const lib = require("../../lib/data");

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

handler._create = {};
handler._create.post = (reqProp, callback) => {
  const id =
    typeof reqProp.body.id === "number" && reqProp.body.id > 0
      ? reqProp.body.id
      : false;
  const title =
    typeof reqProp.body.title === "string" &&
    reqProp.body.title.trim().length > 0
      ? reqProp.body.title.trim()
      : false;
  const description =
    typeof reqProp.body.description === "string" &&
    reqProp.body.description.trim().length > 0
      ? reqProp.body.description.trim()
      : false;
  const date =
    typeof reqProp.body.date === "string" && reqProp.body.date.trim().length > 0
      ? reqProp.body.date.trim()
      : false;
  //   console.log(id, title, description, date);
  if (id && title && description && date) {
    let newData = { id, title, description, date };
    lib.create("data", "data", newData, (err) => {
      if (!err) {
        callback(201, { message: "To-do created", data: newData });
      } else {
        callback(500, { error: `Error creating resource ${err}` });
      }
    });
  } else {
    callback(400, {
      error: `Missing required fields: ${!id ? "id" : ""} ${
        !title ? "title" : ""
      } ${!description ? "description" : ""} ${!date ? "date" : ""}`,
    });
    return;
  }
};

handler._create.get = (reqProp, callback) => {
  const id =
    typeof reqProp.queryStringObj.id === "string" &&
    !isNaN(parseInt(reqProp.queryStringObj.id)) &&
    parseInt(reqProp.queryStringObj.id) > 0
      ? parseInt(reqProp.queryStringObj.id)
      : false;

  if (id) {
    lib.read("data", "data", (err, data) => {
      if (!err && data) {
        const todo =
          typeof data === "object" ? JSON.parse(JSON.stringify(data)) : data;
        const todoId = todo.find((item) => item.id === id);
        if (todoId) {
          callback(200, todoId);
        } else {
          callback(404, {
            error: "To-do not found",
          });
        }
      }
    });
  } else {
    callback(400, {
      error: "Missing or invalid ID",
    });
  }
};

module.exports = handler;
