const fs = require("fs");

console.log("Started");

fs.readFile("file2.txt", "utf-8", (err, data) =>{
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("data", data);

        fs.writeFile("output.txt", data, "utf-8", (err) =>{
            if (err) {
                console.log("Error writing to file:", err);
            } else {
                console.log("Data successfully written to output.txt");
            }
        });
    }
});

console.log("End");
