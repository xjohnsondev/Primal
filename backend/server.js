const app = require("./app");
const { PORT } = require("./config");
const { exec } = require("child_process");

// Define the path to the primal.sql file
const sqlFilePath = "./primal.sql";

// Execute the SQL script as a child process
exec(`psql -f ${sqlFilePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing SQL script: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error executing SQL script: ${stderr}`);
    return;
  }
  console.log("SQL script executed successfully");
  
  // Start the server after the SQL script has been executed
  app.listen(PORT, function () {
    console.log(`Started on https://primal-server.onrender.com:${PORT}`);
  });
});
