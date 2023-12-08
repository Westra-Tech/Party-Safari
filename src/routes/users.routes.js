const usersController = require("../controllers/users.controller.js");

function handleUserRequest(req, res) {
  usersController.dbConnect();

  const parsedUrl = new URL(req.url, "http://localhost:8080");
  if (
    parsedUrl.pathname === "/api/users/login" &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("username") &&
    parsedUrl.searchParams.has("password")
  ) {
    usersController.login(
      req,
      res,
      parsedUrl.searchParams.get("username"),
      parsedUrl.searchParams.get("password")
    );
  } else if (
    parsedUrl.pathname === "/api/users/get-latest-n" &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("N")
  ) {
    usersController.getNLatestUsers(
      req,
      res,
      parsedUrl.searchParams.get("N")
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
}

module.exports = handleUserRequest;
