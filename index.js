// import modules
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//queries
const getEmployees = 'SELECT * FROM employees;';

// Connect to database
const db = mysql.createConnection(
	{
		host: 'localhost',
		// MySQL username,
		user: 'root',
		// MySQL password
		password: 'password123',
		database: 'employees'
});

const sql = db.query(getEmployees, (err, employees) => {
	if (err) {
		console.log("There was an error");
		return;
	}
	return employees;
});

console.log(sql);


// start server
// app.listen(PORT, () => console.log(`Running on port ${PORT}`))
