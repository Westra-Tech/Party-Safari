// This file will handle all the routing
const favoritesController = require("../controllers/favorites.controller.js");

function handleRequest(req, res) {
  favoritesController.dbConnect();
  const parsedUrl = new URL(req.url, "http://localhost:8000");
  // Route requests based on URL paths
  if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "GET" &&
    parsedUrl.searchParams.get("host_id")
  ) {
    favoritesController.getFavorites(
      req,
      res,
      parsedUrl.searchParams.get("user_id")
    );
  } else if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "GET" &&
    parsedUrl.searchParams.get("user_id")
  ) {
    favoritesController.getFavorites(
      req,
      res,
      parsedUrl.searchParams.get("user_id")
    );
  } else if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "GET" &&
    parsedUrl.searchParams.get("party_id")
  ) {
    favoritesController.isPartyFavorited(
      req,
      res,
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("party_id")
    );
  } else if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "PATCH" &&
    parsedUrl.searchParams.get("host_id")
  ) {
    favoritesController.addHostToFavorites(
      req,
      res,
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("host_id")
    );
  } else if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "DELETE" &&
    parsedUrl.searchParams.get("host_id")
  ) {
    favoritesController.removeHostFromFavorites(
      req,
      res,
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("host_id")
    );
  } else if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "PATCH" &&
    parsedUrl.searchParams.get("party_id")
  ) {
    favoritesController.addPartyToFavorites(
      req,
      res,
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("party_id")
    );
  } else if (
    parsedUrl.pathname === "/favorites" &&
    req.method === "DELETE" &&
    parsedUrl.searchParams.get("party_id")
  ) {
    favoritesController.removePartyFromFavorites(
      req,
      res,
      parsedUrl.searchParams.get("user_id"),
      parsedUrl.searchParams.get("party_id")
    );
  } else {
    // Handle 404 Not Found
    console.log("404 Not Found");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Resource Not Found");
  }
}

module.exports = handleRequest;
