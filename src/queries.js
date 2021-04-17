// import modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
									
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

const displayTable = (sql, callback) => {

	db.query(sql, (err, employees) => {
		if (err) {
			console.log(err);
			return;
		}
		
		const table = [];
		
		for (let i = 0; i < employees.length; i++) {
			
			row = {
				firstName: employees[i].first_name,
				lastName: employees[i].last_name,
				title: employees[i].title,
				salary: employees[i].salary,
				manager: employees[i].manager,
				department: employees[i].name
			}
			table.push(row);
		}
		if (table.length === 0) {
			console.log('No matches!');	
		} else {
			console.table(table);
		}
		callback();
	});
}

const viewByManager = callback => {
	
	db.query('SELECT * FROM employees', (err, employees) => {
		const employeeList = [];
		
		for (let i = 0; i < employees.length; i++) {
			const result = `${employees[i].first_name} ${employees[i].last_name}`;
			employeeList.push(result);
		}
		inquirer
		.prompt([
			{
				type: 'list',
				name: 'manager',
				message: 'Pick a manager:',
				choices: employeeList
			}
		])
		.then(answers => {;
			const sql = `SELECT * FROM employees
									LEFT JOIN roles 
									ON employees.role_id = roles.id
									LEFT JOIN departments 
									ON roles.department_id = departments.id
									WHERE manager = '${answers.manager}'
									ORDER BY last_name;`;
			displayTable(sql, callback);
		})
		.catch(error => {
			if(error.isTtyError) {
				console.log(error);
			} else {
				console.log(error);
			}
		});
			
	});

	// displayTable(sql, callback)
}

const addEmployee = (callback) => {
	const roleList = [];
	sql = `SELECT * FROM roles`;

	db.query(sql, (err, roles) => {
		if (err) {
			console.log("There was an error");
			return;
		}
		for (let i = 0; i < roles.length; i++) {
			roleList.push(roles[i].title);
		}
		
		inquirer
		.prompt([
			{
				type: 'list',
				name: 'role',
				message: 'Pick a role:',
				choices: roleList
			},
			{
				type: 'input',
				name: 'firstName',
				message: 'First name:'
			},
			{
				type: 'input',
				name: 'lastName',
				message: 'Last name:'
			},
			{
				type: 'input',
				name: 'managerName',
				message: "Manager's first name:"
			}
		])
		.then(answers => {
			console.table(answers);
			callback();
		})
		.catch(error => {
			if(error.isTtyError) {
				console.log(error);
			} else {
				console.log('Something went wrong.')
			}
		});
		
	});
	
};

const deleteEmployee = (callback) => {
	
	callback();
};

module.exports = {displayTable, viewByManager, addEmployee, deleteEmployee};