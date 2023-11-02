// This file will handle all the routing
const partyController = require("../controllers/party.controller.js");

function handleRequest(req, res) {
  partyController.dbConnect();

  console.log("handling request");
  const parsedUrl = new URL(req.url, "http://localhost:3000");
  if (
    parsedUrl.pathname === "/party_listings/party_id" &&
    req.method === "GET"
  ) {
    console.log("handling3333 request");
    partyController.getPartyDetails(
      req,
      res,
      parsedUrl.searchParams.get("party_id")
    );
  }
}

module.exports = handleRequest;
