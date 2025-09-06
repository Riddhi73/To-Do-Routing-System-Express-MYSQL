const { json } = require("express");
const lib = require("../../lib/data");
const db = require("../../data/database");

const updateHandler = async (req, res) => {
  const { title, description } = req.body;
  // console.log("Update Handler called with ID:", id);
  // If an ID is provided, return a single todo
  if (title.length !== 0 && description.length !== 0) {
    const results = await db.query(
      `UPDATE contents SET title = ?, description = ? WHERE id = ?`,
      [req.body.title,
      req.body.description,
      req.params.id]
    );

    if (results.length === 0) {
      res.status(500).json({
        error: "Data is not correct. Please check again",
      });
    } else {
      res.status(200).json({
        msg: "Updated Successfully",
        data: results
      });
    }
  } else {
    return res.status(400).json({ error: "ID is required for update" });
  }
};

// Export
module.exports = updateHandler;
