// This file will contain the logic for handling each API request.
// Required modules
const { MongoClient } = require("mongodb");

// Initialize the MongoDB client
const mongoClient = new MongoClient("MONGODB_CONNECTION_STRING");

let partyListingCollection;
let favoritesCollection;

// Connect to MongoDB and set up collections for use
mongoClient.connect((err) => {
  // Handle connection errors
  if (err) throw err;

  // Logging successful database connection
  console.log("Connected to the database");

  // Reference to the required collections
  const db = mongoClient.db("YOUR_DB_NAME");
  partyListingCollection = db.collection("partyListing");
  favoritesCollection = db.collection("favorites");
});

/**
 * Handle request for fetching party details.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.getPartyDetails = async (req, res) => {
  const party_id = req.query.party;

  // Validate the presence of the 'party_id' parameter
  if (!party_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "party_id parameter is missing" }));
  }

  try {
    // Fetch the party details using the provided 'party_id'
    const party = await partyListingCollection.findOne({ party_id: party_id });

    // If party not found, return 404 error
    if (!party) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Party not found" }));
    }

    // Return the party details
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(party));
  } catch (error) {
    // Handle any errors that might occur during the fetch operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

/**
 * Add a host to a user's favorites.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.addHostToFavorites = async (req, res) => {
  const { user_id, host_id } = req.query;

  // Validate the presence of required parameters
  if (!user_id || !host_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "Both user_id and host_id parameters are required",
      })
    );
  }

  try {
    // Add host to user's favorites using $addToSet to ensure no duplicates
    await favoritesCollection.updateOne(
      { user_id: user_id },
      { $addToSet: { favoriteHosts: host_id } },
      { upsert: true }
    );

    // Fetch updated favorites for the user
    const updatedFavorites = await favoritesCollection.findOne({
      user_id: user_id,
    });

    // Return the updated favorites list
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedFavorites));
  } catch (error) {
    // Handle any errors that might occur during the update operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

/**
 * Remove a host from a user's favorites.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.removeHostFromFavorites = async (req, res) => {
  const { user_id, host_id } = req.query;

  // Validate the presence of required parameters
  if (!user_id || !host_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "Both user_id and host_id parameters are required",
      })
    );
  }

  try {
    // Remove the specified host from user's favorites
    await favoritesCollection.updateOne(
      { user_id: user_id },
      { $pull: { favoriteHosts: host_id } }
    );

    // Fetch updated favorites for the user
    const updatedFavorites = await favoritesCollection.findOne({
      user_id: user_id,
    });

    // Return the updated favorites list
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedFavorites));
  } catch (error) {
    // Handle any errors that might occur during the update operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};
