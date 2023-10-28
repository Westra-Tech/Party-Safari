// This file will handle all the routing
const mapController = require("../controllers/map.controller.js");

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);

  // Route requests based on URL paths
  if (parsedUrl.pathname === "/api/data" && req.method === "GET") {
    mapController.getAllData(req, res);
  } else if (
    parsedUrl.pathname.startsWith("/api/map") &&
    req.method === "GET"
  ) {
    if (parsedUrl.pathname === "/api/map") {
      mapController.getAllData(req, res);
    } else {
      // Extract the id from the URL
      const id = parsedUrl.pathname.split("/").pop();
      mapController.getDataById(req, res, id);
    }
  } else if (parsedUrl.pathname === "/party_listings" && req.method === "GET") {
    mapController.getPartyDetails(req, res);
  } else if (parsedUrl.pathname === "/favorites" && req.method === "PATCH") {
    mapController.addHostToFavorites(req, res);
  } else if (parsedUrl.pathname === "/favorites" && req.method === "DELETE") {
    mapController.removeHostFromFavorites(req, res);
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

module.exports = handleRequest;
