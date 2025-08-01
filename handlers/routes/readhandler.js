// readHandler.js
const lib = require("../../lib/data");

const readAll = (req, res) => {
  lib.read("data", "data", (err, data) => {
    if (!err && data) {
      const todos = typeof data === "string" ? JSON.parse(data) : data;
      return res.status(200).json(todos);
    }
    return res.status(500).json({ error: "Error reading data" });
  });
};

const readSingle = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  lib.read("data", "data", (err, data) => {
    if (!err && data) {
      const todos = typeof data === "string" ? JSON.parse(data) : data;
      const todo = todos.find((item) => item.id === id);
      if (todo) return res.status(200).json(todo);
      return res.status(404).json({ error: "To-do not found" });
    }
    return res.status(500).json({ error: "Error reading data" });
  });
};

module.exports = { readAll, readSingle };
