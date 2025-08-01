const lib = require("../../lib/data");

const deleteHandler = (req, res) => {
    const id = req.params.id;
    // If an ID is provided, delete the todo
    if (id) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId) || parsedId <= 0) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        lib.read("data", "data", (err, data) => {
            if (!err && data) {
                const todos = typeof data === "string" ? JSON.parse(data) : data;
                const todoIndex = todos.findIndex((item) => item.id === parsedId);
                if (todoIndex !== -1) {
                    todos.splice(todoIndex, 1);
                    lib.delete("data", "data", todos, (writeErr) => {
                        if (!writeErr) {
                            return res.status(200).json({ message: "To-do deleted successfully", data: todos[todoIndex] });
                        } else {
                            return res.status(500).json({ error: "Error writing data" });
                        }
                    });
                } else {
                    return res.status(404).json({ error: "To-do not found" });
                }
            } else {
                return res.status(500).json({ error: "Error reading data" });
            }
        });
    }
}

module.exports = deleteHandler;
