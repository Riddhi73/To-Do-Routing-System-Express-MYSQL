const { sampleHandler } = require("./handlers/routes/sampleHandler");
const handlers = require("./handlers/routes/createHandler");
const routes = {
    sample: sampleHandler,
    create: handlers.createHandler,
};
module.exports =  routes;