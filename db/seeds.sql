SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO departments (name)
	VALUES
		('HR'),
		('Engineering'),
		('Sales'),
		('Marketing');
		
INSERT INTO roles (title, salary, department_id)
	VALUES 
		('HR Manager', 51723, 1),
		('Lead Engineer', 98893, 2),
		('Junior Engineer', 54562, 2),
		('Sales Manager', 63216, 3),
		('Salesperson', 60823, 3),
		('Marketing Manager', 107122, 4),
		('Graphic Designer', 49433, 4),
		('Copywriter', 56978, 4);

INSERT INTO employees (first_name, last_name, role_id, manager)
	VALUES
		('Steve', 'Rogers', 1, null),
		('James', 'Barnes', 4, null),
		('Jean', 'Grey', 2, null),
		('Matt', 'Murdock', 5, 'James'),
		('Jessica', 'Jones', 3, 'Jean'),
		('Kamala', 'Khan', 3, 'Jean'),
		('Karen', 'Page', 8, 'Susan'),
		('Gwen', 'Stacy', 7, 'Susan'),
		('Peter', 'Parker', 3, 'Jean'),
		('Reed', 'Richards', 3, 'Jean'),
		('Susan', 'Storm', 6, null),
		('Wanda', 'Maximoff', 5, 'James'),
		('Carl', 'Lucas', 5, 'James'),
		('Carol', 'Danvers', 8, 'Susan');
		