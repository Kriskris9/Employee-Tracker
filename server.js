const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'job_db'
  },
  console.log(`Connected to the database.`)
);

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
          'View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'
        ]
      }
    ])
    .then((answers) => {
      const { choices } = answers;
      if (choices === 'View All Employees') {
        db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.department_name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id JOIN roles r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;', function (err, results) {
          console.table(results);
          promptUser();
        });
      } else if (choices === 'Add Employee') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'What is the employees first name?'
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'What is the employees last name?'
            },
            {
              type: 'list',
              name: 'role',
              message: 'What is the employees role?',
              choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
            },
            {
              type: 'list',
              name: 'manager',
              message: 'Who is the employees manager?',
              choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Malia Brown', 'Sarah Lourd', 'Tom Allen', 'Tanya Sinclair', 'None']
            }])
          .then((answers) => {
            const { first_name, last_name, role, manager } = answers;
            db.query('INSERT INTO employee (first_name, last_name, role, manager) VALUES (?, ?, ?, ?)', [first_name, last_name, role, manager], function (err, results) {
              console.table(results);
              console.log(
                `Employee ${first_name} ${last_name} has been added to the database.`
              )
              promptUser();
            });
          })
        // Add Employee logic here
      } else if (choices === 'Update Employee Role') {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee',
              message: 'Which employee would you like to update?',
              choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Malia Brown', 'Sarah Lourd', 'Tom Allen', 'Tanya Sinclair']
            },
            {
              type: 'list',
              name: 'role',
              message: 'What is the employees new role?',
              choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
            }
          ])
          .then((answers) => {
            const { employee, role } = answers;
            db.query('UPDATE employee SET role = ? WHERE employee = ?', [answers.role, answers.employee], function (err, results) {
              console.table(results);
              console.log(
                `Employee ${employee} has been updated.`
              )
              promptUser();
            });
          })
      } else if (choices === 'View All Roles') {
        db.query('SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;', function (err, results) {
          console.table(results);
          promptUser();
        });
      } else if (choices === 'Add Role') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: 'What is the title of the role?'
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What is the salary of the role?'
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'What department does the role belong to?',
              choices: ['Sales', 'Engineering', 'Finance', 'Legal']
            }
          ])
          .then((answers) => {
            const { title, salary, department_id } = answers;
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], function (err, results) {
              if (err) throw err;
              console.table(results);
              console.log(
                `Role ${title} has been added to the database.`
              )
              promptUser();
            });
          })
      } else if (choices === 'View All Departments') {
        db.query('SELECT * FROM department', function (err, results) {
          console.table(results);
          promptUser();
        });
      } else if (choices === 'Add Department') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department_name',
              message: 'What is the name of the department?'
            }
          ])
          .then((answers) => {
            const { department_name } = answers;
            db.query('INSERT INTO department (department_name) VALUES (?)', [answers.department_name], function (err, results) {
              console.log(
                `Department ${department_name} has been added to the database.`
              )
              promptUser();
            });
          })
      }
      else if (choices === 'Quit') {
        db.end();
      }

    });

};

promptUser();
