const lib = require("../../lib/data");
const db = require("../../data/database");

const deleteHandler = async (req, res) => {
  try {
    const title = req.body.title;
    const result = await db.getDb().collection("contents").deleteOne({ title });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "To-do not found" });
    }

    res.status(200).json({
      message: "To-do deleted successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).json({ error: "Error deleting data" });
  }
};

module.exports = deleteHandler;
