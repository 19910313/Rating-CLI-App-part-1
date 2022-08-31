import { read, readdir, readFile, writeFile } from "node:fs";
import printf from "printf";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const io = readline.createInterface({ input, output });

const spacePadding = (n) => {
  let space = "";
  for (let i = 0; i < n; i++) space += "";
  return space;
};
const spaceNumber = (m) => {
  let spaces = "";
  for (let i = 0; i < m; i++) spaces += "";
  return spaces;
};
const showUsers = () => {
  //scan 'users' folder
  readdir("users", (err, fileName) => {
    if (!err) {
      console.log("USERS:");
      // loop through each file
      fileName.forEach((fileName) => {
        // console.log(fileName);
        //read file
        readFile(`users/${fileName}`, (err, content) => {
          if (!err) {
            // parse data
            let fragments = content.toString().split("\n");
            let name = fragments[0];
            // name.style.textAlign = "right";
            let rate = parseFloat(fragments[1]).toFixed(1);
            // show data
            // name = spacePadding(12 - name.length) + name;
            // rate = spaceNumber(7 + rate);
            let output = printf("%12s %10.1f", name, rate);
            console.log(output);
          }
        });
      });
    }
    // console.log(err);
  });
};

const addUser = () => {
  io.question("Enter user name: ", (name) => {
    console.clear();
    readdir("users", (err, fileName) => {
      let nextFileNumber = fileName.length;
      let rate = 0.0;
      let data = `      ${name}  \n${rate}`;
      writeFile(`users/${nextFileNumber}.txt`, data, (err) => {
        if (err) {
          console.log("An error occured during saving");
        }
        io.close();
      });
    });
  });
};

export { showUsers, addUser };
