const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  database: "to_do",
  user: "root",
  password: "root",
});
module.exports = pool;
