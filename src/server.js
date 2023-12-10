const http = require("http");
const url = require("url");
const Server = require("./app.js");

// Import the route handlers
const serveLandingPage = require("./views/landingPage.views.js");
const servePartyReviewsPage = require("./views/partyReviewsPage.views.js");
const serveStaticFile = require("./views/staticFile.views.js");
const handleReviewRequests = require("./routes/review.routes.js");
const handleRsvpRequests = require("./routes/rsvp.routes.js");
const handleUserRequests = require("./routes/users.routes.js");
const handlePartyReviewRequests = require("./routes/party.routes.js");
const serveScanTicketsPage = require("./views/scan-tickets.view.js");
const handleScanTicketsRequests = require("./routes/scan-tickets.routes.js");
const handleMapRequests = require("./routes/maps.routes.js");
const handlePartyRequests = require("./routes/party.routes.js");
const serveHostDashboard = require('./views/hostDashboard.views.js');

const router = require("./routes/seba_router.js");
let serverST2 = new Server(8000, "localhost");
let UUID = "034e0c73-6f80-4d82-a348-20acc997130a";


const server = http.createServer((req, res) => {
  // CORS Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  // Route the request to the appropriate handler
  if (pathname === "/") {
        serveLandingPage(req, res);
  } else if (pathname === "/partyReviews") {
        servePartyReviewsPage(req, res);
  } else if (pathname.endsWith(".js") || pathname.endsWith(".css")) {
        serveStaticFile(req, res);
  } else if (pathname.startsWith("/api/reviews")) {
        handleReviewRequests(req, res);
  } else if (pathname.startsWith("/api/rsvp")) {
        handleRsvpRequests(req, res);
  } else if (pathname.startsWith("/api/users")) {
    // Fetches from temporary simplified users collection!
        handleUserRequests(req, res);
  } else if (pathname.startsWith("/api/parties")) {
        // Fetches from temporary simplified parties collection!
        handlePartyReviewRequests(req, res);
  } else if (pathname.startsWith("/scan-tickets")) {
        serveScanTicketsPage(req, res);
  } else if (pathname.startsWith("/api/scan-tickets")) {
        handleScanTicketsRequests(req, res);
  } else if (
    pathname === "/promotions" ||
    pathname === "/create-checkout-session" ||
    pathname === "/shopping_cart" ||
    pathname === "/transactions"
  ) {
        router.applicationServer(req, res);
  } else if (pathname.startsWith("user?login")) {
        serverST2.userLogin();
  } else if (pathname.startsWith("user?profile")) {
        serverST2.getUserInfo(UUID);
  } else if (pathname.startsWith("user?edit_profile")) {
        serverST2.updateUserInfo(UUID);
  } else if (pathname.startsWith("user?del_profile")) {
        serverST2.deleteUser(UUID);
  } else if (req.url.startsWith("/party_listings")) {
        handlePartyReviewRequests(req, res);
    return;
  } else if (req.url.startsWith("/map")) {
    handleMapRequests(req, res);
    return;
  } else if (pathname.startsWith('/host-dashboard')){
        serveHostDashboard(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const port = 8080;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

module.exports = server;
