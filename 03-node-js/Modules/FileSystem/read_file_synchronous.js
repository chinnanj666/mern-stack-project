const fs = require("fs");
let textString = fs.readFileSync("file1.txt", "utf-8");
console.log(textString);

console.log('--------------new---------------------')
const   textOuput = `${textString}\n Machine Learning\n${Date.now()}`
fs.writeFileSync("./file2.txt", textOuput);
console.log(textOuput);
console.log("Successfully read all files and Written files");
