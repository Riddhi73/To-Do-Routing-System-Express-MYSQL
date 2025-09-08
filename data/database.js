// const mysql = require("mysql2/promise");
// const pool = mysql.createPool({
//   host: "localhost",
//   database: "to_do",
//   user: "root",
//   password: "root",
// });
// module.exports = pool;

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
let database;

async function connect() {
  const client = await mongoClient.connect("mongodb://localhost:27017/");
  database = client.db('to-do');
}

function getDb() {
  if (!database) {
    throw { msg: 'Database connection no established' };
  }
  return database;
}

module.exports = {
  connectToDatbase: connect,
  getDb: getDb
}; 


