const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
 
  // Your MySQL username,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: "localhost"
});


module.exports = connection;