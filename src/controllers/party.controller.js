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

let partiesCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
    const db = mongoClient.db("dummy_db");
    partiesCollection = db.collection("parties_co");
};
  

exports.getNLatestParties = async (req, res, N) => {

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
    // Fetch the latest N reviews for the provided party_id or user_id
    // For each review, fetch the username and party title from their respective collections
    const latestDocuments = await partiesCollection.find()
      .sort({ 'timestamp_field': -1 })
      .limit(parseInt(N, 10))
      .toArray();
    console.log("Fetched reviews:", latestDocuments);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(latestDocuments));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}


exports.getPartiesByHost = async (req, res, id) => {
  //check if host_id exists
  if(!id){
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "host_id parameter is missing" + structuredClone(id)}));
  }

  const query = {HostId: id};

  // fetch all parties that this host owns
  try {
    const d = await mongoClient.db("Map");
    const coll = await d.collection("Parties");

    const p = await coll.find(query).toArray();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(p));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}


