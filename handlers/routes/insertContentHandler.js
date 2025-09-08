const db = require("../../data/database");

// sampleHandler.js
const insertContentHandler = async (req, res) => {
  console.log(req.body);
  try {
    const authorName = req.body.name;
    const author = await db
      .getDb()
      .collection("authors")
      .findOne({ name: authorName });
    console.log(author)
    const newContent = {
      title: req.body.title,
      description: req.body.description,
      author: {
        id: author._id,
        name: author.name,
        email: author.email,
      },
    };
    const results = await db.getDb().collection("contents").insertOne(newContent);
    res.status(200).json({
      message: "Data Inserted Successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

module.exports = insertContentHandler;
