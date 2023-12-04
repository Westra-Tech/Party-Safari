require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let partyListingCollection;
let favoritesCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = () => {
  const db = mongoClient.db("Map");
  partyListingCollection = db.collection("Parties");

  favoritesCollection = db.collection("Favorites");
};

// This function handles the retrieval of party details based on party IDs.

exports.getPartyDetails = async (req, res, party_ids) => {
  try {
    // Fetch party details from the database using the provided party IDs.
    const parties = await partyListingCollection.find({
      _id: { $in: party_ids.map(id => new ObjectId(id)) }
    }).toArray();

    // Set the response status and content type.
    res.writeHead(200, { "Content-Type": "application/json" });

    // Send the retrieved party details as a JSON response.
    res.end(JSON.stringify(parties));
  } catch (error) {
    // Handle errors that may occur during the database query or response creation.

    // Log the error for debugging purposes.
    console.error("Error retrieving party details: ", error);

    // Set a 500 Internal Server Error status and content type.
    res.writeHead(500, { "Content-Type": "application/json" });

    // Send an error JSON response to the client.
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};
