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
	const employeeList = [];

	db.query(`SELECT * FROM roles`, (err, roles) => {
		if (err) {
			console.log(err);
			return;
		}
		for (let i = 0; i < roles.length; i++) {
			roleList.push(roles[i].title);
		}
		
		db.query('SELECT * FROM employees', (err, employees) => {
			if (err) {
				console.log(err);
				return;
			}
			for (let i = 0; i < employees.length; i++) {
				const result = `${employees[i].first_name} ${employees[i].last_name}`;
				employeeList.push(result);
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
					message: 'First name:',
					validate: input => {
						if (input) {
							return true;
						} else {
							console.log('Please enter a first name!');
							return false;
						}
					}
				},
				{
					type: 'input',
					name: 'lastName',
					message: 'Last name:',
					validate: input => {
						if (input) {
							return true;
						} else {
							console.log('Please enter a last name!');
							return false;
						}
					}
				},
				{
					type: 'list',
					name: 'managerName',
					message: "Manager's name:",
					choices: employeeList
				}
			])
			.then(answers => {
				const roleId = roleList.indexOf(answers.role) + 1;

				const sql = `
				INSERT INTO employees (first_name, last_name, role_id, manager)
				VALUES ('${answers.firstName}', '${answers.lastName}', ${roleId}, '${answers.managerName}');
				`;
				
				db.query(sql, (err, input) => {
					if (err) {
						console.log(err);
						return;
					}
					console.log(`New employee, ${answers.firstName} ${answers.lastName} saved to records.`)
				});
				callback();
			})
			.catch(error => {
				if(error.isTtyError) {
					console.log(error);
				} else {
					console.log(error);
				}
			});
		});
		
	});
	
};

const deleteEmployee = (callback) => {
	
	callback();
};

module.exports = {displayTable, viewByManager, addEmployee, deleteEmployee};