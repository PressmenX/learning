console.log(__dirname);
console.log(`Hello , ${process.argv[2] || "Guest"}`);

if (process.argv[3] === "stop") {
  console.log("THE PROGRAM IS STOPPED");
  process.exit();
}
