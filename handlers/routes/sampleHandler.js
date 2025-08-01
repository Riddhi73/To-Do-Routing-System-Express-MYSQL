// Handler container
const handler = {};

// Sample route handler
handler.sampleHandler = (reqProp, callback) => {
    // Log test message
    console.log("Sample handler is working");
    // Return success response
    callback(200, {
        message: "This is a sample URL"
    });
};

// Export handler
module.exports = handler;