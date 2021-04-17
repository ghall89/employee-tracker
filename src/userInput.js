// import modules
const inquirer = require('inquirer');

const {displayTable, viewByManager, addEmployee, deleteEmployee} = require('./queries');

let sql = '';

const chooseDept = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'department',
				message: 'Choose a department',
				choices: [
					'HR',
					'Engineering',
					'Sales',
					'Marketing'				
				]
			}
		])
		.then(answers => {
			sql = `SELECT * FROM employees
						LEFT JOIN roles 
						ON employees.role_id = roles.id
						LEFT JOIN departments 
						ON roles.department_id = departments.id
						WHERE name = '${answers.department}'
						ORDER BY last_name;;`;
			displayTable(sql, userInput);
		})
		.catch(error => {
			if(error.isTtyError) {
				console.log(error);
			} else {
				console.log('Something went wrong.')
			}
		});
	
}

const userInput = () => {
	inquirer
	.prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'What would you like to do?',
			choices: [
				'View all employees', 
				'View employees by department',
				'View employees by manager',
				'Add employee',
				'Delete employee',
				'Quit'
			]	
		}
	])
	.then(answers => {
		switch (answers.choice) {
			case 'View all employees':
				sql = `SELECT * FROM employees
							LEFT JOIN roles 
							ON employees.role_id = roles.id
							LEFT JOIN departments 
							ON roles.department_id = departments.id
							ORDER BY last_name;`;
				displayTable(sql, userInput);
				break;
			case 'View employees by department':
				chooseDept();
				break;
			case 'View employees by manager':
				viewByManager(userInput);
				break;
			case 'Add employee':
				addEmployee(userInput);
				break;
			case 'Delete employee':
				deleteEmployee(userInput);
				break;
			case 'Quit':
				process.exit();
		}
	})
	.catch(error => {
		if(error.isTtyError) {
			console.log(error);
		} else {
			console.log('Something went wrong.')
		}
	});
}

module.exports = userInput;