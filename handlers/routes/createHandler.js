// handlers/routes/createHandler.js
const lib = require("../../lib/data");

const createHandler = (req, res) => {
  const { id, title, description, date } = req.body;

  const validId = typeof id === "number" && id > 0 ? id : false;
  const validTitle =
    typeof title === "string" && title.trim().length > 0 ? title.trim() : false;
  const validDescription =
    typeof description === "string" && description.trim().length > 0
      ? description.trim()
      : false;
  const validDate =
    typeof date === "string" && date.trim().length > 0 ? date.trim() : false;

  if (validId && validTitle && validDescription && validDate) {
    const newTodo = {
      id,
      title: validTitle,
      description: validDescription,
      date: validDate,
    };
    lib.read("data", "data", (err, data) => {
      if (err) {
        return res.status(500).json({ error: `Error reading data: ${err}` });
      }
      // Check if the ID already exists
      const existingTodo = data.find((todo) => todo.id === validId);
      if (existingTodo) {
        return res.status(400).json({ error: "ID already exists" });
      } else {
        lib.create("data", "data", newTodo, (err) => {
          if (!err) {
            res.status(201).json({ message: "To-do created", data: newTodo });
          } else {
            res.status(500).json({ error: `Error creating resource: ${err}` });
          }
        });
      }
    });
  } else {
    const missing = [];
    if (!validId) missing.push("id");
    if (!validTitle) missing.push("title");
    if (!validDescription) missing.push("description");
    if (!validDate) missing.push("date");

    res
      .status(400)
      .json({ error: `Missing or invalid fields: ${missing.join(", ")}` });
  }
};

module.exports = createHandler;
