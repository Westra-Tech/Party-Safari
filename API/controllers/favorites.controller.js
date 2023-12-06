// This file will contain the logic for handling each API request.
// Initialize the MongoDB client
require("dotenv").config();
const { ObjectId } = require("mongodb");
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
  favoritesPartyCollection = db.collection("FavoritesParty");
};

/**
 * Handle request for fetching party details.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */

/**
 * Add a host to a user's favorites.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.addHostToFavorites = async (req, res, user_id, host_id) => {
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
exports.removeHostFromFavorites = async (req, res, user_id, host_id) => {
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

/**
 * Handle request for fetching party details.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.getFavorites = async (req, res, user_id) => {
  // Validate the presence of required parameters
  if (!user_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "user_id parameter is required",
      })
    );
  }

  try {
    // Fetch the user's favorites
    const favorites = await favoritesCollection.findOne({ user_id: user_id });

    // Return the user's favorites
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(favorites));
  } catch (error) {
    // Handle any errors that might occur during the fetch operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

exports.isPartyFavorited = async (req, res, user_id, party_id) => {
  // Validate the presence of required parameters

  if (!user_id || !party_id) {
    res.writeHead(400, { "Content-Type": "application/json" });

    return res.end(
      JSON.stringify({
        error: "user_id and party_id parameters are required",
      })
    );
  }

  try {
    // check if the party is in the user's favorites
    const favorites = await favoritesPartyCollection.findOne({
      user_id: user_id,
    });

    if (
      favorites.favoriteParties.some((party) => party.party_id === party_id)
    ) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(true));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(false));
    }
  } catch (error) {
    console.log(error);
    // Handle any errors that might occur during the update operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

/**
 * Add a party to a user's favorites.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.addPartyToFavorites = async (req, res, user_id, party_id) => {
  // Validate the presence of required parameters
  if (!user_id || !party_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "user_id, host_id, and party_id parameters are required",
      })
    );
  }

  try {
    // Add party to user's favorites using $addToSet to ensure no duplicates
    await favoritesPartyCollection.updateOne(
      { user_id: user_id },
      { $addToSet: { favoriteParties: { party_id } } },
      { upsert: true }
    );

    // Fetch updated favorites for the user
    const updatedFavorites = await favoritesPartyCollection.findOne({
      user_id: user_id,
    });

    // Return the updated favorites list
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedFavorites));
  } catch (error) {
    console.log(error);
    // Handle any errors that might occur during the update operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

/**
 * Remove a party from a user's favorites.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.removePartyFromFavorites = async (req, res, user_id, party_id) => {
  // Validate the presence of required parameters
  if (!user_id || !party_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "user_id, host_id, and party_id parameters are required",
      })
    );
  }

  try {
    // Remove the specified party from user's favorites
    await favoritesPartyCollection.updateOne(
      { user_id: user_id },
      { $pull: { favoriteParties: { party_id } } }
    );

    // Fetch updated favorites for the user
    const updatedFavorites = await favoritesPartyCollection.findOne({
      user_id: user_id,
    });

    // Return the updated favorites list
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedFavorites));
  } catch (error) {
    console.log(error);
    // Handle any errors that might occur during the update operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

/**
 * Handle request for fetching party details.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.getPartyFavorites = async (req, res) => {
  const { user_id } = req.query;

  // Validate the presence of required parameters
  if (!user_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "user_id parameter is required",
      })
    );
  }

  try {
    // Fetch the user's favorites
    const favorites = await favoritesPartyCollection.findOne({
      user_id: user_id,
    });

    // Return the user's favorites
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(favorites));
  } catch (error) {
    // Handle any errors that might occur during the fetch operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};
