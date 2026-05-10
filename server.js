const http = require("http");
const os = require("os")

const server = http.createServer((req, res) => {
  if (req.url === "/status") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Server ${os.hostname} Time : ${new Date().toLocaleTimeString()}</h1>`);
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Silakan akses /status");
  }
});

server.listen(5000, () => {
  console.log("Server sedang berjalan di http://localhost:5000/status");
});
