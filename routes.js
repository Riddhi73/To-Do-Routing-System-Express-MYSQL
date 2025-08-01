// Import sample route handler
const sampleHandler = require("./handlers/routes/sampleHandler");

// Import create handler module
const create = require("./handlers/routes/createHandler");

// Import update handler module
const update = require("./handlers/routes/updateHandler");

// Import delete handler module
const deleteHandler = require("./handlers/routes/deleteHandler");

// Import read handler module
const {readAll, readSingle} = require("./handlers/routes/readHandler");


// Define route-to-handler mappings
const routes = {
  sample: sampleHandler, // Handle sample route
  create: create, // Handle create request
  readAll: readAll, // Handle read all request
  readSingle: readSingle, // Handle read single request
  update: update, // Handle update request
  delete: deleteHandler // Handle delete request
};

// Export all route handlers
module.exports = routes;
