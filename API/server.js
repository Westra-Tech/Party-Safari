//This file will create the server and use the routes defined in maps.routes.js.
const http = require("http");
const handleRequest = require("./routes/maps.routes.js");

const server = http.createServer((req, res) => {
  // Enable CORS - Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins

  handleRequest(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Server encountered an error: ${error.message}`);
});
