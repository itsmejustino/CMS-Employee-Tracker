const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("./config/connection");

connection.connect(
  (error) => {
    if (error) throw error;
    startingMenu();
  }
)
//initialize the application.
function startingMenu(){
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Please choose an option.",
        choices: [
          {
            type: 'input',
            name: "View all departments",
            value: "viewDepartments",
          },
          {
            type: 'input',
            name: "View all employees",
            value: "viewEmployees",
          },
          {
            type: 'input',
            name: "View all roles",
            value: "viewRoles",
          },
          {
            type: 'input',
            name: "Add a department",
            value: "createDepartment",
          },
          {
            type: 'input',
            name: "Add a role",
            value: "createRole",
          },
          {
            type: 'input',
            name: "Add an employee",
            value: "createEmployee",
          },
          {
            type: 'input',
            name: "Update employee role",
            value: "updateEmployee",
          },
          {
            type: 'input',
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ])
    .then((choice) => {
      // const { choice } = choices;
      if (choice === "viewDepartments") {
        getDepartments();
      }
      if (choice == "viewRoles") {
        getDepartments();
      }
      if (choice == "viewEmployees") {
        getEmployees();
      }
      if (choice == "createDepartment") {
        addDepartment();
      }
      if (choice == "createEmployee") {
        addEmployee();
      }
      if (choice == "createRole") {
        addRole();
      }
      if (choice == "exit") {
        connection.end();
        process.exit();
      }
    });
};

const getDepartments = async () => {
  const response = await inquirer.prompt([
    {
      message: "Viewing all departments",
      name: "viewingDepartments",
    },
  ]);
  const sql = "SOURCE departments";
  db.query(sql, response.viewingDepartments, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

const getEmployees = async () => {
  const response = await inquirer.prompt([
    {
      message: "Viewing all employees.",
      name: "viewingEmployees",
    },
  ]);
  const sql = "INSERT INTO departments (name) VALUES (?)";
  db.query(sql, response.viewingEmployees, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

const getRoles = async () => {
  const response = await inquirer.prompt([
    {
      message: "Viewing all roles.",
      name: "viewingRoles",
    },
  ]);
  const sql = "INSERT INTO departments (name) VALUES (?)";
  db.query(sql, response.viewingRoles, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

const addDepartment = async () => {
  const response = await inquirer.prompt([
    {
      message: "What is the name of your department?",
      name: "createdDepartment",
    },
  ]);
  const sql = "INSERT INTO departments (name) VALUES (?)";
  db.query(sql, response.createdDepartment, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

const addRole = async () => {
  const response = await inquirer.prompt([
    {
      message: "What is the name of role you would like to create??",
      name: "createdRole",
    },
  ]);
  const sql = "INSERT INTO role (name) VALUES (?)";
  db.query(sql, response.createdRole, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

const addEmployee = async () => {
  const response = await inquirer.prompt([
    {
      message: "What is the name of role you would like to create??",
      name: "createdEmployee",
    },
  ]);
  const sql = "INSERT INTO role (name) VALUES (?)";
  db.query(sql, response.createdEmployee, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

const editEmployee = async () => {
  const response = await inquirer.prompt([
    {
      message: "What is the name of role you would like to create??",
      name: "updatedEmployee",
    },
  ]);
  const sql = "INSERT INTO role (name) VALUES (?)";
  db.query(sql, response.updatedEmployee, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};
