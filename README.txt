Subteam 1 readme


server.js
This is the entry point of the application. It sets up an HTTP server and listens on a specified port for incoming requests. When a request is received, it's handed off to a function imported from maps.routes.js for routing.

maps.routes.js
This file is responsible for routing incoming requests to the appropriate controller functions based on the request's URL path and HTTP method. For example, a GET request to /api/data would be routed to the getAllData function in map.controller.js.

map.controller.js
This file contains the controller functions that handle each API request. Each function takes a request and a response object, performs the necessary database operations, and sends a response back to the client. The database operations are performed using collections from a MongoDB database, which are set up when the application starts.

models
The models directory should contain files that define the schema for each collection in your MongoDB database. Each file should export a Mongoose model that can be used in your controller functions to perform database operations.

