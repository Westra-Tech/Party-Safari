const dotenv = require("dotenv");
const path = require("path");

// Debug: Log the expected path of the .env file
const envPath = path.resolve(process.cwd(), '.env');
console.log(`Looking for .env file at: ${envPath}`);
// Attempt to load the .env file
const result = dotenv.config();
// Debug: Log the result of dotenv.config()
if (result.error) {
  console.error('Error loading .env file', result.error);
} else {
  console.log('.env file loaded successfully');
}

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
    const db = mongoClient.db("dummy_db");
    usersCollection = db.collection("users_co");
  };
  
exports.login = async (req, res, username, password) => {
  // Validate the presence of the 'username' parameter
  if (!username) {
    res.writeHead(400, { "Content-Type": "application/json" });
    console.error('username parameter is missing');
    return res.end(JSON.stringify({ error: "username parameter is missing" }));
  }
  // Validate the presence of the 'password' parameter
  if (!password) {
    res.writeHead(400, { "Content-Type": "application/json" });
    console.error('password parameter is missing');
    return res.end(JSON.stringify({ error: "password parameter is missing" }));
  }

  try {
    // Fetch the user details using the provided 'username' and 'password'
    const user = await usersCollection.findOne({ username, password });
    if (user) {
      // User found, return the user_id
      console.log("User login successful:", user);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ user_id: user._id }));
    } else {
      // No user found with the given username and password
      console.error("User not found or invalid credentials: ", username);
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid credentials" }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

exports.getNLatestUsers = async (req, res, N) => {
  // Validate the 'N' parameter, as it's always required.
  if (!N || isNaN(N) || N < 0 || N > 10) {
    res.writeHead(400, { "Content-Type": "application/json" });
    const message = !N ? 'N parameter is missing' :
                    isNaN(N) ? 'N is not a number' :
                    'N is out of range [0, 10]';
    console.error(message);
    return res.end(JSON.stringify({ error: message }));
  }
  try {
    // Fetch the latest N users
    const users = await usersCollection
      .find({}, { projection: { _id: 0, username: 1 } })
      .sort({ _id: -1 })
      .limit(parseInt(N, 10))
      .toArray();
    console.log("Fetched latest N users:", users);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}