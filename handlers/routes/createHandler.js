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

module.exports = handler;
