// readHandler.js
const lib = require("../../lib/data");
const db = require("../../data/database");

const readAll = async (req, res) => {
  try {
    const results = await db.getDb().collection('contents').find().toArray();
    // console.log(results);
    const filteredResult = results.map((item) => ({
      name: item.author.name,
      title: item.title,
      description: item.description
    }))
    res.status(200).json(filteredResult);
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

const readSingle = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const [results] = await db.query(
      `SELECT * FROM contents INNER JOIN authors ON contents.authors_id = authors.id WHERE authors.id = ?`,
      [req.params.id]
    );
    if (results.length === 0) {
      res.status(500).json({ error: "No Data" });
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

module.exports = { readAll, readSingle };
