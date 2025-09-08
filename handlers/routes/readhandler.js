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


module.exports = { readAll };
