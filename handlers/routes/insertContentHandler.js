const db = require("../../data/database");

// sampleHandler.js
const insertContentHandler = async (req, res) => {
  const data = [req.body.title, req.body.description, req.body.author_id];
  //console.log(req.body);
  try {
    const [results] = await db.query(
      "INSERT INTO contents (title, description, authors_id) VALUES (?)",
      [data]
    );
      res.status(200).json({
          message: 'Data Inserted Successfully',
          data: results,
    });
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

module.exports = insertContentHandler;
