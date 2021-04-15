INSERT INTO departments (name)
	VALUES
		('HR'),
		('Engineering'),
		('Sales'),
		('Marketing');
		
INSERT INTO roles (title, salary, department_id)
	VALUES ('Lead Engineer', 150000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
	VALUES
		('Steve', 'Rogers', 1, 0),
		('James', 'Barnes', 1, 0),
		('Jean', 'Grey', 1, 0),
		('Matt', 'Murdock', 1, 0),
		('Jessica', 'Jones', 1, 0),
		('Kamala', 'Khan', 1, 0),
		('Karen', 'Page', 1, 0),
		('Gwen', 'Stacy', 1, 0),
		('Peter', 'Parker', 1, 0),
		('Reed', 'Richards', 1, 0),
		('Susan', 'Storm', 1, 0),
		('Wanda', 'Maximoff', 1, 0),
		('Carl', 'Lucas', 1, 0),
		('Carol', 'Danvers', 1, 0);
		