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
let promotedCollection;
let discountedCollection;
let favoritesPartyCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = () => {
  const db = mongoClient.db("Map");
  partyListingCollection = db.collection("Parties");
  favoritesCollection = db.collection("Favorites");
  promotedCollection = db.collection("Promoted");
  discountedCollection = db.collection("Discounted");
  favoritesPartyCollection = db.collection("FavoritesParty");
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


/**
 * getPartyListingsByLocation - Retrieve party listings within a specific location.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {string} location - Location to filter party listings by.
 * @returns {Promise<void>} - Returns party listings within the specified location.
 *
 * Extracts location from an HTTP request and filters parties by matching location, date, and time.
 * Responds with a JSON array of party listings (HTTP status 200) on success.
 * Handles errors with appropriate HTTP status codes (500 for internal server errors or
 * 400 for missing location parameter).
 */
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
    // Find parties with zip code, address, state, or city matching the location
    // and within the next 3 days with a future end date
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
    
    // Collect party listings into an array
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



/**
 * getPartyListingsByFilters - Retrieves party listings based on input filters.
 *
 * @param {Object} filters - Filter parameters for party listings.
 * @returns {Promise<void>} - Returns filtered party listings and pagination data.
 *
 * This function takes input filters and retrieves party listings accordingly.
 * It handles discounts, pagination, and responds with a JSON object containing party listings
 * and pagination details (HTTP status 200) on success.
 * For errors, it responds with appropriate HTTP status codes (500 for internal server errors or
 * 400 for invalid filter parameters).
 */
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
  limit,
  favorite,
  discount,
  userId
) => {
  try {
    // Build the query object based on the provided filters
    let query = {};
    // If the 'favorite' filter is on, fetch the user's favorite hosts and filter by them
    if (favorite === "on") {
      const userFavorites = await favoritesCollection.findOne({ user_id: userId });
      
      console.log("User favorites:", userFavorites);
      if (userFavorites && userFavorites.favoriteList) {
        query.HostName = { $in: userFavorites.favoriteList };
      }
    }

    // If the 'discount' filter is on, filter by the Discounted field
    if (discount === "on") {
      query.Discounted = true;
    }

    if (start_time) {
      query.StartDate = { $gte: new Date(start_time) };
    } else {
      query.StartDate = { $gte: new Date() }; // Default to today's date if start_time is not provided
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

    // checks if any of the prices provided are negative, if so, return error
    if (min_price && Number(min_price) < 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error: "min_price cannot be negative",
        })
      );
    }

    // checks if any of the prices provided are negative, if so, return error
    if (max_price && Number(max_price) < 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error: "max_price cannot be negative",
        })
      );
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

    // Apply discounts to parties if the 'discount' filter is active
    if (discount === "on") {
      for (let party of parties) {
        const discountEntry = await discountedCollection.findOne({ partyID: party._id.toString() });
        if (discountEntry) {
          party.originalPrice = party.Price;
          party.Price = discountEntry.discountedPrice;
        }
      }
    }    
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

/**
 * getPromotedParties - Returns promoted parties from array of party objects or party IDs sorted by amount paid.
 *                      Promotions that paid the most money will be outputted first.
 *
 *  @param {Object} req - The HTTP request object.
 * Input:
 *   - Request body contains JSON data with an array of party objects or party IDs.
 *     Example: { "partiesOrIds": [...] }
 *   - Party objects should have an "_id" field.
 *
 * @param {Object} res - The HTTP response object.
 * Output:
 *   - Responds with a JSON array of promoted party objects or party IDs.
 *   - If input includes party objects, the output will contain full party objects.
 *   - If input includes party IDs, the output will contain only those IDs.
 *   - In case of an error, responds with a 500 Internal Server Error.
 */
exports.getPromotedParties = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(body);
      const partiesOrIds = Array.isArray(parsedBody)
        ? parsedBody
        : parsedBody.partiesOrIds;

      let partyIds,
        returnFullPartyObjects = false;

      if (partiesOrIds[0] && typeof partiesOrIds[0] === "object") {
        partyIds = partiesOrIds.map((party) => party._id.toString());
        returnFullPartyObjects = true;
      } else {
        partyIds = partiesOrIds;
      }

      // Log party IDs being searched
      console.log("Searched party IDs: ", partyIds);

      // Fetch promotions for the given party IDs
      const promotions = await promotedCollection
        .find({
          partyID: { $in: partyIds },
        })
        .toArray();

      // Log promotions data
      console.log("Promotions: ", promotions);

      // Filter out promotions that are not currently valid
      const currentTimestamp = new Date();
      const validPromotions = promotions.filter(
        (promotion) =>
          promotion.promotionStart <= currentTimestamp &&
          promotion.promotionEndDate >= currentTimestamp
      );

      // Log valid promotions
      console.log("Valid Promotions: ", validPromotions);

      // Sort valid promotions by amountPaid in descending order
      validPromotions.sort((a, b) => b.amountPaid - a.amountPaid);

      // Extract sorted promoted party IDs
      const promotedPartyIds = validPromotions.map(
        (promotion) => promotion.partyID
      );

      let result;
      if (returnFullPartyObjects) {
        // Fetch and return the full party objects for the promoted parties
        result = await partyListingCollection
          .find({
            _id: { $in: promotedPartyIds.map((id) => new ObjectId(id)) },
          })
          .toArray();
      } else {
        // Return only the promoted party IDs
        result = promotedPartyIds;
      }

      // Sending back the response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error("Error getting promoted parties: ", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  });
};

/**
 * filterFavoriteHostParties - Returns parties hosted by a user's favorite hosts.
 *
 * @param {Object} req - HTTP request with user ID as a query parameter and array of either party objects or party IDs in the body.
 * @param {Object} res - HTTP response with either an array of party objects or array of party IDs that are from favorite hosts.
 *                      Responds with 404 if user favorites are not found and 500 for other errors.
 *  You pass in partys and it returns the same list back keeping only partys hosted by the Users favorite Host
 */
exports.filterFavoriteHostParties = async (req, res) => {
  // Parse the URL to get user_id from query parameters
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const userId = parsedUrl.searchParams.get("user_id");

  if (!userId) {
    // If user_id is missing, return a 400 Bad Request response
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "user_id parameter is missing" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(body);
      const partiesOrIds = Array.isArray(parsedBody)
        ? parsedBody
        : parsedBody.partiesOrIds;

      // Fetch favorite hosts for the user
      // console.log("Fetching user favorites for user ID:", userId);
      const userFavorites = await favoritesCollection.findOne({
        user_id: userId,
      });
      if (!userFavorites) {
        // console.log("User favorites not found for user ID:", userId);
        // If user favorites are not found, return a 404 Not Found response
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User favorites not found" }));
        return;
      }
      // console.log("User favorites found:", userFavorites);

      // Extract favorite host names
      const favoriteHostNames = userFavorites.favoriteList;
      // console.log("Favorite host names:", favoriteHostNames);

      let parties;
      if (partiesOrIds[0] && typeof partiesOrIds[0] === "object") {
        parties = partiesOrIds;
      } else {
        // Log the IDs being searched in the collection
        const idsToSearch = partiesOrIds.map((id) => new ObjectId(id));
        // console.log("Searching for IDs in partyListingCollection:", idsToSearch);

        parties = await partyListingCollection
          .find({
            _id: { $in: idsToSearch },
          })
          .toArray();

        // console.log("Found parties:", parties);
      }

      // Filter parties whose host name is in the favorite host names
      const favoriteParties = parties.filter((party) =>
        favoriteHostNames.includes(party.HostName)
      );

      // Prepare the result
      const result = Array.isArray(parsedBody)
        ? favoriteParties
        : favoriteParties.map((party) => party._id);

      // Send the response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error("Error filtering favorite host parties: ", error);
      // If there's an error, return a 500 Internal Server Error response
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  });
};
