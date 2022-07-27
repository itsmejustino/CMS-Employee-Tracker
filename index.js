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

const departmentListNames = async () => {
  const nameOfDepartments = await connection.promise()
  .query("SELECT id, department_name FROM department");
  // console.log("++++++++++++++++",nameOfDepartments[0], "+++++++++++++")
  // return nameOfDepartments[0];
 
  // console.log(nameOfDepartments[0])

   const mappedDepartmentNames = nameOfDepartments[0].map(({id, department_name}) => {
    return {
     name: department_name,
     value: id,
    }
  
  });
 console.log(mappedDepartmentNames)
return mappedDepartmentNames;
};

// const departmentListIds = async () => {
//   const nameOfDepartments = await connection.promise()
//   .query("SELECT id, department_name FROM department");
//   // console.log("++++++++++++++++",nameOfDepartments[0], "+++++++++++++")
//   // return nameOfDepartments[0];
 
//   const mappedDepartmentName = nameOfDepartments[0].map(() => {
//    let item = {
//      department_name
//     }
   
//   });


//   console.log("++++++++++++++++",item,"++++++++++++++++");
//   // console.log("++++++++++++++++",mappedDepartments, "++++++++++++")
// return mappedDepartmentName;
// };



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
      type: "list",
      message: "Please choose the department the belongs to.",
      name: "connectDepartment",
      choices: departmentListNames(),
    
  
    },
  ]);

  const sql =
    "INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)";
  const vals = [
    response.createdRole,
    response.connectDepartment,
    response.createdSalary,
  ];

  await connection.promise().query(sql, vals, (err, result) => {
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
      type: "list",
      message: "Please choose the department the belongs to.",
      name: "connectDepartment",
      choices: [
        {
          name: "Accounting",
          value: 1,
        },
        {
          name: "Engineering",
          value: 2,
        },
        {
          name: "Development",
          value: 3,
        },
        {
          name: "Admin",
          value: 4,
        },
        {
          name: "Human Resources",
          value: 5,
        },

        {
          type: "list",
          message:
            "Please choose the role that the employee will be assigned to.",
          name: "connectDepartment",
          choices: [
            {
              name: "Accounting",
              value: 1,
            },
            {
              name: "Engineering",
              value: 2,
            },
            {
              name: "Development",
              value: 3,
            },
            {
              name: "Admin",
              value: 4,
            },
            {
              name: "Human Resources",
              value: 5,
            },
          ],
        },
      ],
    },
  ]);
  const sql = "INSERT INTO role (name) VALUES (?)";
  connection.query(sql, response.createdEmployee, (err, result) => {
    if (err) throw error;
    console.log(result);
  });
};

// const editEmployee = async () => {
//   const response = await inquirer.prompt([
//     {
//       message: "What is the name of role you would like to create??",
//       name: "updatedEmployee",
//     },
//   ]);
//   const sql = "INSERT INTO role (name) VALUES (?)";
//   connection.query(sql, response.updatedEmployee, (err, result) => {
//     if (err) console.error(err);
//     console.log(result);
//   });
// };
