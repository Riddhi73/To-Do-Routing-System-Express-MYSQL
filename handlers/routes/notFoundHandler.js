// Container object
const handler = {};

// 404 error handler
handler.notFoundHandler = (reqProp, callback) => {
    // Log error
    console.log("No handler found for this route");
    // Send 404 response
    callback(404, {
        message: "Route not found"
    });
};

// Export handler
module.exports = handler;
