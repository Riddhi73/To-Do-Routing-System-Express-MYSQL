const db = require("../../data/database");

// sampleHandler.js
const sampleHandler = async (req, res) => {
  try {
    const authors = await db.getDb().collection("authors").find().toArray();
    res.status(200).json(authors);
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

module.exports = sampleHandler;
