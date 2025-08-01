// sampleHandler.js
const sampleHandler = (req, res) => {
  console.log("Sample handler is working");
  res.status(200).json({ message: "This is a sample URL" });
};
module.exports = sampleHandler;
