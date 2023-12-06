//This file will create the server and use the routes defined in maps.routes.js.
const http = require("http");
const handleMapRequests = require("./routes/maps.routes.js");
const handlePartyRequests = require("./routes/party.routes.js");
const handleFavoritesRequests = require("./routes/favorites.routes.js");
const handleHostRequests = require("./routes/host.routes.js");

const server = http.createServer((req, res) => {
  // Log incoming requests
  console.log(`Incoming request: ${req.method} ${req.url}`);

  // Enable CORS - Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.writeHead(204); // No content in the response for preflight requests
    res.end();
    return;
  }

  if (req.url.startsWith("/party_listings")) {
    handlePartyRequests(req, res);
    return;
  } else if (req.url.startsWith("/map")) {
    handleMapRequests(req, res);
    return;
  } else if (req.url.startsWith("/favorites")) {
    handleFavoritesRequests(req, res);
    return;
  } else if (req.url.startsWith("/host")) {
    handleHostRequests(req, res);
    return;
  } else {
    // Handle 404 Not Found
    console.log("404 Not Found");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Resource Not Found");
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Server encountered an error: ${error.message}`);
});
