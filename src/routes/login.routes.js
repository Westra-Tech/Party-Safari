// routes/login.routes.js
const usersController = require("../controllers/users.controller.js");
const loginFail = require("../views/loginfail.views.js");

function handleLogins(req, res) {
  usersController.dbConnect();

  const parsedUrl = new URL(req.url, "http://localhost:8080");
  if (
    parsedUrl.pathname === "/sendlogin" &&
    req.method === "GET" &&
    parsedUrl.searchParams.has("username") &&
    parsedUrl.searchParams.has("password")
  ) {
    const username = parsedUrl.searchParams.get("username");
    const password = parsedUrl.searchParams.get("password");

    // Call the login function from the controller
    console.log('attempt to login handle login');
    usersController.login(req, res, username, password)
      .then((result) => {
        if (result.ok) {
            console.log("handle logins, ok");
            //set username to true in json
            
          // Redirect to success page or handle success case
          res.writeHead(302, { Location: "/landingPage.views.js" }); // Change '/success' to your success route
          res.end();
        } else {
          // Redirect to login fail page
          loginFail(req, res);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Handle error cases
        //res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      });
  } else {
    //res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
}

module.exports = handleLogins;
