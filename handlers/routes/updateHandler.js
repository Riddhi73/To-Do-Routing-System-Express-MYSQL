const { json } = require("express");
const lib = require("../../lib/data");

const updateHandler = (req, res) => {
  const id = req.params.id;
  const { title, description, date } = req.body;
  // console.log("Update Handler called with ID:", id);
  // If an ID is provided, return a single todo
  if (id) {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const validTitle =
      typeof title === "string" && title.trim().length > 0
        ? title.trim()
        : false;
    const validDescription =
      typeof description === "string" && description.trim().length > 0
        ? description.trim()
        : false;
    const validDate =
      typeof date === "string" && date.trim().length > 0 ? date.trim() : false;

    lib.read("data", "data", (err, data) => {
      if (!err && data) {
        let todos = JSON.parse(JSON.stringify(data));
        const todoIndex = todos.findIndex((todo) => todo.id === parsedId);
        // console.log("Todo Index:", todoIndex);
        if (todoIndex !== -1) {
          // console.log("Found todo:", todo);
          todos[todoIndex].title = validTitle;
          todos[todoIndex].description = validDescription;
          todos[todoIndex].date = validDate;
          lib.update("data", "data", todos, (err) => {
            if (!err) {
              // console.log("Todo updated successfully");
              res.status(200).json({
                message: "To-do updated successfully",
                data: todos[todoIndex],
              });
            } else {
              // console.error("Error updating todo:", err);
              return res.status(500).json({ error: "Error updating data" });
            }
          });
        } else {
          return res.status(404).json({ error: "To-do not found" });
        }
      } else {
        return res.status(500).json({ error: "Error reading data" });
      }
    });
  } else {
    return res.status(400).json({ error: "ID is required for update" });
  }
};

// Export
module.exports = updateHandler;
