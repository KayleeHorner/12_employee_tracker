const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  inquirer
  .prompt({
    name: "purpose",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all Employees",
        "View all Employees by Departments", 
        "View all Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View all Roles",
        "Done"
    ]
  })
  .then(function(answer) {
    // based on their answer, call corresponding function
    if (answer.purpose === "View all Employees") {
      viewAllEmp();
    } else if (answer.purpose === "View all Employees by Departments") {
      deptView();
    } else if (answer.purpose === "View all Employees by Manager") {
      viewEmpMan();
    } else if (answer.purpose === "Add Employee") {
      addEmp();
    } else if (answer.purpose === "Remove Employee") {
      removeEmp();
    } else if (answer.purpose === "Update Employee Role") {
      updateRole();
    } else if (answer.purpose === "Update Employee Manager") {
      updateManager();
    } else if (answer.purpose === "View All Roles") {
      viewAllRoles();
    } else if(answer.purpose === "Done") {
      connection.end();
    } else {
      connection.end();
    }
  });
}

// function to view all employees
function viewAllEmp() {
  connection.query("SELECT * FROM employee", function(err, results) {
  console.table(results);
  });
  start();
};

// function to view employees by manager
function viewEmpMan() {
  connection.query("SELECT * FROM department employee  ", function(err, results) {
  console.table(results);
  });
  start();
};

// function to view employees by department
function deptView() {
  connection.query("SELECT * FROM department employee  ", function(err, results) {
  console.table(results);
  });
  start();
};

// function to add new employee
function addEmp() {
  connection.query("SELECT * FROM employee  ", function(err, results) {
    inquirer
      .prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is the employee's first name?"
        },
        {
          name: "lastname",
          type: "input",
          message: "What is the employee's last name?"
        },
        {
          name: "role",
          type: "input",
          message: "What is this employee's role ID?",
        },
        {
          name: "manager",
          type: "input",
          message: "What is this employee's manager's ID?"
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.role,
            manager_id: answer.input
          },
          function(err) {
            if (err) throw err;
            console.log("Employee was added successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
          );
      });
    });
  }

// function to remove employee
function removeEmp() {
  connection.query("SELECT * FROM department employee  ", function(err, results) {
  console.table(results);
  });
  start();
};

// function to update employee role
function updateRole() {
  connection.query("SELECT * FROM department employee  ", function(err, results) {
  console.table(results);
  });
  start();
};

// function to update an employee's manager
function updateManager() {
  connection.query("SELECT * FROM department employee  ", function(err, results) {
  console.table(results);
  });
  start();
};

// function to view all roles
function viewAllRoles() {
  connection.query("SELECT * FROM role  ", function(err, results) {
  console.table(results);
  });
  start();
};
// prompt for info about the item being put up for auction


// function bidAuction() {
// // query the database for all items being auctioned
// connection.query("SELECT * FROM auctions", function(err, results) {
//   if (err) throw err;
//   // once you have the items, prompt the user for which they'd like to bid on
//   inquirer
//     .prompt([
//       {
//         name: "choice",
//         type: "rawlist",
//         choices: function() {
//           var choiceArray = [];
//           for (var i = 0; i < results.length; i++) {
//             choiceArray.push(results[i].item_name);
//           }
//           return choiceArray;
//         },
//         message: "What auction would you like to place a bid in?"
//       },
//       {
//         name: "bid",
//         type: "input",
//         message: "How much would you like to bid?"
//       }
//     ])
//     .then(function(answer) {
//       // get the information of the chosen item
//       var chosenItem;
//       for (var i = 0; i < results.length; i++) {
//         if (results[i].item_name === answer.choice) {
//           chosenItem = results[i];
//         }
//       }

//       // determine if bid was high enough
//       if (chosenItem.highest_bid < parseInt(answer.bid)) {
//         // bid was high enough, so update db, let the user know, and start over
//         connection.query(
//           "UPDATE auctions SET ? WHERE ?",
//           [
//             {
//               highest_bid: answer.bid
//             },
//             {
//               id: chosenItem.id
//             }
//           ],
//           function(error) {
//             if (error) throw err;
//             console.log("Bid placed successfully!");
//             start();
//           }
//         );
//       }
//       else {
//         // bid wasn't high enough, so apologize and start over
//         console.log("Your bid was too low. Try again...");
//         start();
//       }
//     });
// });
// }
