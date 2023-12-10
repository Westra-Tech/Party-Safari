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


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

let rsvpsCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`;
  const mongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const db = mongoClient.db("dummy_db");
  rsvpsCollection = db.collection("rsvps_co");
};

exports.rsvpToParty = async (req, res, party_id, user_id) => {
  console.log('rsvpToParty controller called');
  // Validate the presence of the 'party_id' and 'user_id' parameters
  if (!party_id || !user_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    console.error('party_id or user_id parameter is missing');
    return res.end(JSON.stringify({ error: "party_id or user_id parameter is missing" }));
  }

  try {
    // Check if the user has already RSVPed to the party
    const existingRsvp = await rsvpsCollection.findOne({
      party_id: new ObjectId(party_id),
      user_id: new ObjectId(user_id),
    });

    if (existingRsvp) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User has already RSVPed to this party" }));
    }

    // If not, create a new RSVP entry
    const newRsvp = {
      party_id: new ObjectId(party_id),
      user_id: new ObjectId(user_id),
      rsvp_date: new Date(),
    };

    const result = await rsvpsCollection.insertOne(newRsvp);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "RSVP successful", rsvp_id: result.insertedId }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};
