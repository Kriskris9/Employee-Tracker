const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password123',
    database: 'job_db'
  },
  console.log(`Connected to the database.`)
);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: 
      ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }
    
    
  ])

  .then(() => {
const {choices} = answers;

if (choices === 'View All Employees') {
}

else if (choices === 'Add Employee') {
}
else if (choices === 'Update Employee Role') {
}
else if (choices === 'View All Roles') {
}
else if (choices === 'Add Role') {
}
else if (choices === 'View All Departments') {
}
else if (choices === 'Add Department') {
}

});





