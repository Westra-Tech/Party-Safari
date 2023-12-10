// This file will handle all the routing
const mapController = require("../controllers/map.controller.js");

function handleRequest(req, res) {
  mapController.dbConnect();
  const parsedUrl = new URL(req.url, "http://localhost:3000");

  // Route requests based on URL paths
  if (parsedUrl.pathname === "/api/data" && req.method === "GET") {
    mapController.getAllData(req, res);
  } else if (
    parsedUrl.pathname.startsWith("/map") &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("location")
  ) {
    mapController.getPartyListingsByLocation(
      req,
      res,
      parsedUrl.searchParams.get("location")
    );
  } else if (
    parsedUrl.pathname === "/map/party_listings" &&
    req.method === "GET"
  ) {
    mapController.getPartyDetails(
      req,
      res,
      parsedUrl.searchParams.get("party_id")
    );
  } else if (
    parsedUrl.pathname === "/map/favorites" &&
    req.method === "PATCH"
  ) {
    mapController.addHostToFavorites(req, res);
  } else if (
    parsedUrl.pathname === "/map/favorites" &&
    req.method === "DELETE"
  ) {
    mapController.removeHostFromFavorites(req, res);
  } else if (
    parsedUrl.pathname === "/map/party_listings_by_filters" &&
    req.method === "GET"
  ) {
    mapController.getPartyListingsByFilters(
      req,
      res,
      parsedUrl.searchParams.get("start_date"),
      parsedUrl.searchParams.get("end_date"),
      parsedUrl.searchParams.get("min_price"),
      parsedUrl.searchParams.get("max_price"),
      parsedUrl.searchParams.get("host"),
      parsedUrl.searchParams.get("sort_by"),
      parsedUrl.searchParams.get("page"),
      parsedUrl.searchParams.get("limit")
    );
  } else {
    // Handle 404 Not Found
    console.log("404 Not Found");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Resource Not Found");
  }
}

module.exports = handleRequest;
