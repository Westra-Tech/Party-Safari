const scanTicketsController = require("../controllers/scan-tickets.controller.js");

function handleRequest(req, res) {
  scanTicketsController.connect();

  const parsedUrl = new URL(req.url, "http://localhost:8080");
  if (
    parsedUrl.pathname === "/api/scan-tickets/update-ticket" &&
    req.method === "PUT" &&
    parsedUrl.searchParams.has("id")
  ) {
    scanTicketsController.updateTicketStatus(
      req,
      res,
      parsedUrl.searchParams.get("id")
    );
  } 
}

module.exports = handleRequest;
