const hostController = require("../controllers/host.controller");

function handleRequest(req, res) {
  hostController.dbConnect();
  const parsedUrl = new URL(req.url, "http://localhost:8000");

  if (parsedUrl.pathname === "/host" && req.method === "GET") {
    hostController.getHostDetails(
      req,
      res,
      parsedUrl.searchParams.get("host_id")
    );
  } else if (
    parsedUrl.pathname === "/host/party_listings" &&
    req.method === "GET"
  ) {
    hostController.getHostPartyListings(
      req,
      res,
      parsedUrl.searchParams.get("host_id")
    );
  } else if (parsedUrl.pathname === "/host/reviews" && req.method === "GET") {
    hostController.getHostReviews(
      req,
      res,
      parsedUrl.searchParams.get("host_id")
    );
  } else if (parsedUrl.pathname === "/host/reviews" && req.method === "POST") {
    hostController.addHostReview(req, res);
  } else if (parsedUrl.pathname === "/host/reviews" && req.method === "PATCH") {
    hostController.updateHostReview(req, res);
  } else if (
    parsedUrl.pathname === "/host/reviews" &&
    req.method === "DELETE"
  ) {
    hostController.deleteHostReview(req, res);
  } else {
    // Handle 404 Not Found
    console.log("404 Not Found");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Resource Not Found");
  }
}

module.exports = handleRequest;
