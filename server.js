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
          if (err) throw err;
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
              type: 'input',
              name: 'role_id',
              message: 'What is the ID of the employees role?',
            },
            {
              type: 'input',
              name: 'manager_id',
              message: 'What is the ID of employees manager?',
            
            }])
          .then((answers) => {
            const { first_name, last_name, role_id, manager_id } = answers;
    
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id], function (err, results) {
              if (err) throw err;
              console.table(results);
              console.log(
                `Employee ${first_name} ${last_name} has been added to the database.`
              )
              promptUser();
            });
          })
        // Add Employee logic here
      } else if (choices === 'Update Employee Role') {
  db.query('SELECT id,title FROM roles', function (err, results){
    var roleChoices = results.map(({id,title}) => ({
      name: title,
      value: id
    }))


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
              name: 'role_id',
              message: 'What is the employees new role?',
              choices: roleChoices
            }
          ])
          .then((answers) => {
            const { employee, role_id} = answers;
            const employeesName = employee.split(" ");
            db.query('UPDATE employee SET role_id= ? WHERE first_name = ? and last_name = ?', [role_id, employeesName[0], employeesName[1]], function (err, results) {
              if (err) throw err;
              console.table(results);
              console.log(
                `Employee ${employee} has been updated.`
              )


              promptUser();
            });
          })
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
              type: 'input',
              name: 'department_id',
              message: 'What is the department ID?',
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
