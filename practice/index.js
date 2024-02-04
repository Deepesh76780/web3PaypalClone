const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("req received");
  fs.appendFile("log.txt", `${Date.now()}`, (err, data) => {
    res.end("<h1>deepesh </h1>");
  });
});

server.listen(3000, () => {
  console.log("server started");
});
