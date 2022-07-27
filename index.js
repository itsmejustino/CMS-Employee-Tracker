const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { query, promise } = require("./config/connection");
const e = require("express");

connection.connect((error) => {
  if (error) throw error;
  startingMenu();
});
//initialize the application.
function startingMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Please choose an option.",
        choices: [
          {
            name: "View all departments",
            value: "viewDepartments",
          },
          {
            name: "View all employees",
            value: "viewEmployees",
          },
          {
            name: "View all roles",
            value: "viewRoles",
          },
          {
            name: "Add a department",
            value: "createDepartment",
          },
          {
            name: "Add a role",
            value: "createRole",
          },
          {
            name: "Add an employee",
            value: "createEmployee",
          },
          {
            name: "Update employee role",
            value: "updateEmployee",
          },
          {
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ])
    .then(({ options }) => {
      if (options === "viewDepartments") {
        getDepartments();
      }
      if (options == "viewRoles") {
        getRoles();
      }
      if (options == "viewEmployees") {
        getEmployees();
      }
      if (options == "createDepartment") {
        addDepartment();
      }
      if (options == "createEmployee") {
        addEmployee();
      }
      if (options == "createRole") {
        addRole();
      }
      if (options == "updateEmployee") {
        editEmployee();
      }
      if (options == "exit") {
        console.log("exiting program");
        process.exit();
      }
    });
}

const getDepartments = async () => {
  const response = await inquirer
    .prompt([
      {
        message: "Viewing all departments",
        name: "viewingDepartments",
      },
    ])
    .then(console.log("(Press [ENTER] to view table)"));

  const sql = "SELECT * FROM department";
  connection.query(sql, response.viewingDepartments, (err, result) => {
    if (err) throw err;
    console.table(result);
    startingMenu();
  });
};

const getEmployees = async () => {
  const response = await inquirer
    .prompt([
      {
        message: "Viewing all employees.",
        name: "viewingEmployees",
      },
    ])
    .then(console.log("(Press [ENTER] to view table)"));

  console.log("(Press [ENTER] to view table)");
  const sql = "SELECT * FROM employee";
  connection.query(sql, response.viewingEmployees, (err, result) => {
    if (err) throw err;
    console.table(result);
    startingMenu();
  });
};

const getRoles = async () => {
  const response = await inquirer
    .prompt([
      {
        message: "Viewing all roles.",
        name: "viewingRoles",
      },
    ]).then(console.log("(Press [ENTER] to view table)"));

  const sql = "SELECT * FROM role";
  connection.query(sql, response.viewingRoles, (err, result) => {
    if (err) throw err;
    console.table(result);
    startingMenu();
  });
};

const addDepartment = async () => {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of your department?",
      name: "createdDepartment",
    },
  ]);

  const sql = "INSERT INTO department (department_name) VALUES (?)";
  connection.query(sql, response.createdDepartment, (err, result) => {
    if (err) throw err;
    console.log("[ADDED DEPARTMENT SUCCESSFULLY]");
    startingMenu();
  });
};

const addRole = async () => {
 const response = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of role you would like to create??",
      name: "createdRole",
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "createdSalary",
    },
    {
      type: "input",
      message: "Please select the department this belongs to. [Must enter a number]",
      name: "connectDepartment",
    },
  ]);

  const sql =
    "INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)";
  const vals = [
    response.createdRole,
    response.connectDepartment,
    response.createdSalary,
  ];
  connection.query(sql, vals, (err, result) => {
    if (err) throw err;
    console.table(result);
    console.log("[ADDED ROLE SUCCESSFULLY]");
    startingMenu();
  });
  
  
};

const addEmployee = async () => {
  const response = await inquirer.prompt([
    {
      message: "What is the first name of employee you would like to create??",
      name: "employeeFname",
    },
    {
      message: "What is the last name of employee you would like to create??",
      name: "employeeLname",
    },

    {
      type: "input",
      message: "Please give the role this employee the belongs to. [Provide Role Id]",
      name: "connectRole",
    },
    {
      type: "input",
      message: "Please choose the department manager of this employee. [Provide Manager Id]",
      name: "connectManager",
    },
  ]);
  const sql =
  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
const vals = [
  response.employeeFname,
  response.employeeLname,
  response.connectRole,
  response.connectManager,
];
  connection.query(sql, vals, (err, result) => {
    if (err) throw error;
    console.log(result);
  });
};

// const editEmployee = async () => {
//   const response = await inquirer.prompt([
//     {
//       message: "What is the employee you want to edit??",
//       name: "updatedEmployee",
//     },
//   ]);


//   const sql = "INSERT INTO role (name) VALUES (?)";
//   connection.query(sql, response.updatedEmployee, (err, result) => {
//     if (err) console.error(err);
//     console.log(result);
//   });
// };
