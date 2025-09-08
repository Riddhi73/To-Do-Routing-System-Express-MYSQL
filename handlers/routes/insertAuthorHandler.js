// handlers/routes/createHandler.js
const db = require("../../data/database")

const insertAuthorHandler = async (req, res) => {
  const newAuthor = {
    name: req.body.name,
    email: req.body.email
  }
  //console.log(req.body);
  try {
    const results = await db.getDb().collection('authors').insertOne(newAuthor);
      res.status(200).json({
          message: 'Data Inserted Successfully',
          data: results,
    });
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Error Reading Data" });
  }
};

module.exports = insertAuthorHandler;
