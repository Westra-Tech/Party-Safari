//This file will create the server and use the routes defined in maps.routes.js.
const http = require("http");
const handleMapRequests = require("./routes/maps.routes.js");
const handlePartyRequests = require("./routes/party.routes.js");

const server = http.createServer((req, res) => {
  
  // Log incoming requests
  console.log(`Incoming request: ${req.method} ${req.url}`);
  

  // Enable CORS - Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins

  if (req.url.startsWith("/party_listings")) {
    handlePartyRequests(req, res);
    return;
  } else {
    handleMapRequests(req, res);
    return;
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Server encountered an error: ${error.message}`);
});
