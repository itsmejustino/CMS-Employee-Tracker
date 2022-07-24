const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
      // const { choice } = choices;
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
  const response = await inquirer.prompt([
    {
      message: "Viewing all departments",
      name: "viewingDepartments",
    },
    
  ]).then(console.log("(Press [ENTER] to view table)"));
  
  const sql = "SELECT * FROM department";
  connection.query(sql, response.viewingDepartments, (err, result) => {
    if (err) throw error;
    console.table(result);
    startingMenu();
  });
};

const getEmployees = async () => {
  const response = await inquirer.prompt([
    {
      message: "Viewing all employees.",
      name: "viewingEmployees",
    },
   
  ]).then(console.log("(Press [ENTER] to view table)"));
  console.log("(Press [ENTER] to view table)")
  const sql = "SELECT * FROM employee";
  connection.query(sql, response.viewingEmployees, (err, result) => {
    if (err) throw error;
    console.table(result);
    startingMenu();
  });
};

const getRoles = async () => {
  const response = await inquirer.prompt([
    {
      message: "Viewing all roles.",
      name: "viewingRoles",
    },
   
  ]);
  console.log("(Press [ENTER] to view table)")
  const sql = "SELECT * FROM role";
  connection.query(sql, response.viewingRoles, (err, result) => {
    if (err) throw error;
    console.table(result);
    startingMenu();
    
    
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
  connection.query(sql, response.createdDepartment, (err, result) => {
    if (err) throw error;
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
  connection.query(sql, response.createdRole, (err, result) => {
    if (err) throw error;
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
  connection.query(sql, response.createdEmployee, (err, result) => {
    if (err) throw error;
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
  connection.query(sql, response.updatedEmployee, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};
