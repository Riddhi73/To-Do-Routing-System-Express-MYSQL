const { sampleHandler } = require("./handlers/routes/sampleHandler");
const create = require("./handlers/routes/createHandler");
const update = require("./handlers/routes/updateHandler");
const deleteHandler = require("./handlers/routes/deleteHandler");
const read = require("./handlers/routes/readhandler");
const routes = {
    sample: sampleHandler,
    create: create.createHandler,
    read: read.readhandler,
    update: update.updateHandler,
    delete: deleteHandler.deleteHandler,
    
};
module.exports =  routes;