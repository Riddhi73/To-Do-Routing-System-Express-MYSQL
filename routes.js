// Import sample route handler
const { sampleHandler } = require("./handlers/routes/sampleHandler");

// Import create handler module
const create = require("./handlers/routes/createHandler");

// Import update handler module
const update = require("./handlers/routes/updateHandler");

// Import delete handler module
const deleteHandler = require("./handlers/routes/deleteHandler");

// Import read handler module
const read = require("./handlers/routes/readhandler");

// Define route-to-handler mappings
const routes = {
  sample: sampleHandler, // Handle sample route
  create: create.createHandler, // Handle create request
  read: read.readhandler, // Handle read request
  update: update.updateHandler, // Handle update request
  delete: deleteHandler.deleteHandler, // Handle delete request
};

// Export all route handlers
module.exports = routes;
