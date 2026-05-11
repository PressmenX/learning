const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt")
fs.promises.writeFile(filePath, "Hello")

