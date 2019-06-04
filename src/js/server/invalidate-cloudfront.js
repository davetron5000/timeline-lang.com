const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const htmlPath = path.join(__dirname, "..", "..", "..", "production");

const htmlFiles = fs
  .readdirSync(htmlPath)
  .filter(function(file) {
    const extension = path.extname(file);
    return extension === ".html";
  })
  .map(function(file) {
    return `/${file}`;
  });

const command = `aws cloudfront create-invalidation --profile=personal --distribution=EV4FW9FKK2YHL --paths ${htmlFiles.join(
  " "
)}`;

childProcess.exec(command, function(error, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
});
