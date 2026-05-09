const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "laporan_harian");
fs.mkdirSync(dirPath, { recursive: true });

const filePath = path.join(dirPath, "info.txt");
fs.promises.writeFile(filePath, `Laporan dibuat pada : ${new Date()}`);
fs.promises.readFile(filePath, "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message));
