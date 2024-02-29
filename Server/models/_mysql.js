const mysql = require("mysql2/promise"); // For connecting to MySQL database

// Replace with your actual connection details
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "Shihab786..",
	database: "StockManagementSystem_001356993",
});


module.exports = { pool };