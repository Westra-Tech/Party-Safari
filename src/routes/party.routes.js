const partiesController = require("../controllers/party.controller.js");

function handlePartyRequest(req, res) {
  partiesController.dbConnect();

  const parsedUrl = new URL(req.url, "http://localhost:8080");
  if (
    parsedUrl.pathname === "/api/parties/get-latest-n" &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("N")
  ) {
    partiesController.getNLatestParties(
      req,
      res,
      parsedUrl.searchParams.get("N")
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
}

module.exports = handlePartyRequest;
