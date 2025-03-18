const fs = require("fs");

function readFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err.message);
        } else {
            console.log(data);
        }
    });
}

function writeFile(filename) {
    fs.writeFile(filename, "Hello, World!", (err) => {
        if (err) {
            console.log("Error writing to file:", err.message);
        } else {
            console.log("File written successfully!");
        }
    });
}

function appendToFile(filename) {
    fs.appendFile(filename, "\nHey, World!", (err) => {
        if (err) {
            console.log("Error appending to file:", err.message);
        } else {
            console.log("Some text in file appended successfully!");
        }
    });
}

function deleteFile(filename) {
    fs.unlink(filename, (err) => {
        if (err) {
            console.log("Error deleting file:", err.message);
        } else {
            console.log("File deleted successfully!");
        }
    });
}

function renameFile(oldFile, newFile) {
    fs.rename(oldFile, newFile, (err) => {
        if (err) {
            console.log("Error renaming file:", err.message);
        } else {
            console.log("File renamed successfully!");
        }
    });
}

function createDirectory(directoryName) {
    fs.mkdir(directoryName, { recursive: true }, (err) => {
        if (err) {
            console.log("Error creating directory:", err.message);
        } else {
            console.log("Created directory!");
        }
    });
}

function readDirectory(directoryName) {
    fs.readdir(directoryName, (err, files) => {
        if (err) {
            console.log("Error reading directory:", err.message);
        } else {
            console.log("Files in directory:", files);
        }
    });
}

function isFileExist(filename) {
    fs.access(filename, fs.constants.F_OK, (err) => {
        if (err) {
            console.log("File does not exist!");
        } else {
            console.log("File exists!");
        }
    });
}

function getFileStatus(filename) {
    fs.stat(filename, (err, stats) => {
        if (err) {
            console.log("Error getting file status:", err.message);
        } else {
            console.log("File status:", stats);
        }
    });
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
isFileExist(filename);
getFileStatus(filename);
