const { json } = require("express");
const lib = require("../../lib/data");
const db = require("../../data/database");

const updateHandler = async (req, res) => {
  const { title, description } = req.body;
  if (title.length !== 0 && description.length !== 0) {
    const authorName = req.body.name;
    const author = await db
      .getDb()
      .collection("authors")
      .findOne({ name: authorName });
    console.log(author);
    const filter = { "author.id": author._id };
    const newContent = {
      title: req.body.title,
      description: req.body.description,
    };
    const results = await db
      .getDb()
      .collection("contents")
      .updateOne(filter, {$set: newContent});
    res.status(200).json({
      message: "Data Updated Successfully",
      data: results,
    });
  } else {
    return res.status(400).json({ error: "Please check your data" });
  }
};

// Export
module.exports = updateHandler;
