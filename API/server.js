//This file will create the server and use the routes defined in maps.routes.js.
const http = require("http");
const handleRequest = require("./routes/maps.routes.js");

const server = http.createServer(handleRequest);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
