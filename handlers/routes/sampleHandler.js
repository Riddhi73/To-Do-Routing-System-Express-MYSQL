const db = require("../../data/database");

// sampleHandler.js
const sampleHandler = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM authors");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

module.exports = sampleHandler;
