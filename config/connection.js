const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "Godisgood6111993", 
  database: "employee_tracker",
});


module.exports = connection;