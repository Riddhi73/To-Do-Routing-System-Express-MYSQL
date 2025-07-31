const handler = {};

handler.sampleHandler = (reqProp, callback) => {
    console.log("Sample handler is working");
    callback(200, {
        message: "This is a sample URL"
    });
};

module.exports = handler;