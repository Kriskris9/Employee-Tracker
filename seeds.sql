INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");


INSERT INTO roles (title, salary, department_id)
VALUES ("Salary Lead", "10000", 001),
       ("Salesperson", "80000", 001),
       ("Lead Engineer", "10000", 002),
       ("Software Engineer","120000", 002),
       ("Account Manager","160000", 003),
		("Accountant", "125000", 003),
       ("Legal Team Lead","250000", 004),
       ("Lawyer", "190000", 004);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 001, NULL),
       ("Mike", "Chan", 001, 001),
       ("Ashley", "Rodriguez", 002, NULL),
       ("Kevin","Tupik", 002, 003),
       ("Kunal","Signh", 003, NULL),
		("Malia", "Brown", 003, 005),
       ("Sarah","Lourd", 004, NULL),
       ("Tom", "Allen", 004, 007);


