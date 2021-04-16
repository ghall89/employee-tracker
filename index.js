// import modules
const inquirer = require('inquirer');
const mysql = require('mysql2');

//queries
const getEmployees = `SELECT * FROM employees
											LEFT JOIN roles 
											ON employees.role_id = roles.id
											LEFT JOIN departments 
											ON roles.department_id = departments.id;`;

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



db.query(getEmployees, (err, employees) => {
	if (err) {
		console.log("There was an error");
		return;
	}
	
	const table = [];
	
	for (let i = 0; i < employees.length; i++) {
		
		let managerName;
		
		if (employees[i].manager_id) {
			const managerId = employees[i].manager_id;
			managerName = employees[managerId].first_name;
		} else {
			managerName = 'N/A';
		}
		
		row = {
			firstName: employees[i].first_name,
			lastName: employees[i].last_name,
			title: employees[i].title,
			salary: employees[i].salary,
			manager: managerName,
			department: employees[i].name
		}
		table.push(row);
	}
	
	console.table(table);
});
