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
};

/**
 * Handle request for fetching party details.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object.
 */
exports.getPartyDetails = async (req, res, party_id) => {
  // Validate the presence of the 'party_id' parameter
  if (!party_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "party_id parameter is missing" }));
  }

  try {
    // Fetch the party details using the provided 'party_id'
    const party = await partyListingCollection.findOne({
      _id: new ObjectId(party_id),
    });

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

exports.getFavorites = async (req, res) => {
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

exports.getPartyListingsByLocation = async (req, res, location) => {
  // Validate the presence of required parameters
  if (!location) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "location parameter is required",
      })
    );
  }

  try {
    // find parties with zip code same as location, and time is within next 3 days
    const parties = await partyListingCollection
      .find({
        $or: [
          { AddressLine1: location },
          { Zip: location },
          { State: location },
          { City: location },
        ],
        StartDate: { $lt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
        EndDate: { $gt: new Date() },
      })
      .toArray();
    let partyListings = [];
    await parties.map((party) => {
      partyListings.push(party);
    });

    // Return the parties
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(partyListings));
  } catch (error) {
    console.log("error", error);
    // Handle any errors that might occur during the fetch operation
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

exports.getPartyListingsByFilters = async (
  req,
  res,
  start_time,
  end_time,
  min_price,
  max_price,
  host,
  sort_by,
  page,
  limit
) => {
  try {
    // Build the query object based on the provided filters
    let query = {};
    if (start_time) {
      query.StartDate = { $gte: new Date(start_time) };
    }
    if (end_time) {
      query.EndDate = { $lte: new Date(end_time) };
    }
    if (max_price) {
      query.Price = {
        ...query.Price,
        $gte: Number(min_price),
        $lte: Number(max_price),
      };
    }
    if (min_price) query.Price = { ...query.Price, $gte: Number(min_price) };

    if (host) {
      query.HostName = { $regex: new RegExp(host, "i") };
    }

    // Build the sort object based on the provided sort_by parameter
    let sort = {};
    if (sort_by) {
      const [field, order] = sort_by.split("_");
      sort[field] = order === "desc" ? -1 : 1;
    }

    // Calculate the number of items to skip for pagination
    let skip = 0;
    if (page && limit) {
      skip = (Number(page) - 1) * Number(limit);
    }

    // Fetch the total number of parties that match the filters
    const totalParties = await partyListingCollection.find(query);
    // Fetch the parties for the current page
    const parties = await partyListingCollection
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    // Return the parties along with the pagination data
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        parties: parties,
        pagination: {
          totalParties: totalParties,
          currentPage: page ? Number(page) : 1,
          totalPages: limit ? Math.ceil(totalParties / Number(limit)) : 1,
        },
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};
