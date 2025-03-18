const fs = require("fs");

function readFile(filename) {
    const reader = fs.readFileSync(filename, 'utf8');
    console.log(reader);
}

function writeFile(filename) {
    fs.writeFileSync(filename, "Hello, World!");
    console.log("File written successfully!");
}

function appendToFile(filename) {
    fs.appendFileSync(filename, "\nHey, World!");
    console.log("Some text in file appended successfully!");
}

// function deleteFile(filename) {
//     fs.unlinkSync(filename);
//     console.log("File deleted successfully!");
// }

function renameFile(oldFile, newFile) {
    fs.renameSync(oldFile, newFile);
    console.log("File renamed successfully!");
}


function createDirectory(directoryName) {
    fs.mkdirSync(directoryName, { recursive: true });
    console.log("Created directory!");
}

function readDirectory(directoryName) {
    const files = fs.readdirSync(directoryName);
    console.log("Files in directory:", files);
}
function isFileExist(filename) {
    if (fs.existsSync(filename)) {
        console.log("File exists!");
    } else {
        console.log("File does not exist!");
    }
}

function getFileStatus(filename) {
    try {
        const stats = fs.statSync(filename);
        console.log("File status:", stats);
    } catch (err) {
        console.log("Error getting file status:", err.message);
    }
}
const filename = "test.txt";
const directoryName = "newDirectory";


writeFile(filename);
readFile(filename);
appendToFile(filename);
renameFile(filename, "newTest.txt");
readFile("newTest.txt");
// deleteFile("newTest.txt");
createDirectory(directoryName);
readDirectory(directoryName);
isFileExist(filename)
getFileStatus(filename);


