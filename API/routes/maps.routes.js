const url = require("url");
const dataController = require("../controllers/map.controller.js");

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);

  // Route requests based on URL paths
  if (parsedUrl.pathname === "/api/data" && req.method === "GET") {
    dataController.getAllData(req, res);
  } else if (parsedUrl.pathname === "/api/map/:id" && req.method === "GET") {
    // Handle other data-related routes, e.g., get data by ID
    // dataController.getDataById(req, res);
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

module.exports = handleRequest;
