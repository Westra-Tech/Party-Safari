const rsvpController = require("../controllers/rsvp.controller.js");

function handleRsvpRequest(req, res) {
  console.log(`rsvp.routes started`);
  rsvpController.dbConnect();
  console.log(`rsvp.routes dbconnect`);

  const parsedUrl = new URL(req.url, "http://localhost:8080");
  if (
    parsedUrl.pathname === "/api/rsvp" &&
    req.method === "POST" &&
    parsedUrl.searchParams.has("party_id") &&
    parsedUrl.searchParams.has("user_id")
  ) {
    rsvpController.rsvpToParty(
      req,
      res,
      parsedUrl.searchParams.get("party_id"),
      parsedUrl.searchParams.get("user_id")
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
}

module.exports = handleRsvpRequest;
