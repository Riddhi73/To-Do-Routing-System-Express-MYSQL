const handler = {};

handler.notFoundHandler = (reqProp, callback) => {
    console.log("No handler found for this route");
    callback(404, {
        message: "Route not found"
    });
};

module.exports = handler;
