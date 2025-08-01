const handler = {};
const lib = require("../../lib/data");

handler._delete = {};

handler.deleteHandler = (reqProp, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.includes(reqProp.method)) {
    handler._delete[reqProp.method](reqProp, callback);
  } else {
    callback(405, {
      error: "Method not allowed",
    });
    return;
  }
};

handler._delete.delete = (reqProp, callback) => {
    const id =
        typeof reqProp.queryStringObj.id === "string" &&
        !isNaN(parseInt(reqProp.queryStringObj.id)) &&
        parseInt(reqProp.queryStringObj.id) > 0
            ? parseInt(reqProp.queryStringObj.id)
            : false;
    if (id) {
        lib.read("data", "data", (err, data) => {
            if (!err && data) {
                let todo = JSON.parse(JSON.stringify(data));
                const todoIndex = todo.findIndex((item) => item.id === id);
                if (todoIndex !== -1) {
                    todo.splice(todoIndex, 1);
                    lib.update("data", "data", todo, (err) => {
                        if (!err) {
                            callback(200, { message: "To-do deleted successfully" });
                        } else {
                            callback(500, { error: `Error deleting resource ${err}` });
                        }
                    });
                } else {
                    callback(404, { error: "To-do not found" });
                }
            } else {
                callback(500, { error: `Error reading data ${err}` });
            }
        });
    }
}
module.exports = handler;
