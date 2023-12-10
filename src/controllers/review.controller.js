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

let reviewsCollection;
let usersCollection;
let partiesCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
  const db = mongoClient.db("dummy_db");
  reviewsCollection = db.collection("reviews_co");
  usersCollection = db.collection("users_co");
  partiesCollection = db.collection("parties_co");
};

exports.getOneReviewByID = async (req, res, review_id) => {
  // Validate the presence of the 'review_id' parameter
  if (!review_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    console.error('review_id parameter is missing');
    return res.end(JSON.stringify({ error: "review_id parameter is missing" }));
  }

  try {
    // Fetch the review details using the provided 'review_id'
    const review = await reviewsCollection.findOne({
      _id: review_id,
    });

    // If review not found, return 404 error
    if (!review) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Review not found" }));
    }
    console.log("Fetched review:", review);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(review));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

exports.getNLatestReviewsByID = async (req, res, party_id, user_id, N) => {

  // Validate the 'N' parameter, as it's always required.
  if (!N || isNaN(N) || N < 0 || N > 10) {
    res.writeHead(400, { "Content-Type": "application/json" });
    const message = !N ? 'N parameter is missing' :
                    isNaN(N) ? 'N is not a number' :
                    'N is out of range [0, 10]';
    console.error(message);
    return res.end(JSON.stringify({ error: message }));
  }

  // Construct the match condition based on provided parameters.
  const matchCondition = {};
  if (party_id) matchCondition.party_id = party_id;
  if (user_id) matchCondition.user_id = user_id;

  // If neither party_id nor user_id is provided, return an error.
  if (Object.keys(matchCondition).length === 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Either party_id or user_id parameter is required" }));
  }

  try {
    // Fetch the latest N reviews for the provided party_id or user_id
    // For each review, fetch the username and party title from their respective collections
    const reviews = await reviewsCollection.aggregate([
      { $match: { ...matchCondition } },                    // Unpack the match condition
      { $sort: { review_date: -1 } },                       // Sort by date descending
      { $limit: N },                                        // Limit to N documents
      { $lookup: {                                          // Lookup to add username
          from: "users_co",                                 // Collection to join with
          localField: "user_id",                            // Field from the reviews collection
          foreignField: "_id",                              // Field from the users collection
          as: "user_info"                                   // Result as user_info
      }},
      { $lookup: {                                          // Lookup to add party title
          from: "parties_co",                               // Collection to join with
          localField: "party_id",                           // Field from the reviews collection
          foreignField: "_id",                              // Field from the parties collection
          as: "party_info"                                  // Result as party_info
      }},
      { $unwind: { path: "$user_info", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$party_info", preserveNullAndEmptyArrays: true } },
      { $project: {                                         // Define the structure of the output documents
          _id: 1,
          review_title: 1,                                  // Add review_title to the output  
          username: "$user_info.username",                  // Add username to the output
          review_date: 1,                                   // Add review_date to the output
          rating: 1,                                        // Add rating to the output
          party_name: "$party_info.Name",                   // Add party name to the output
          review_text: 1,                                   // Add review_text to the output
      }}
    ]).toArray();
    console.log("Fetched reviews:", reviews);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(reviews));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

function isValidDate(dateString) {
  const tempDate = new Date(dateString);
  return tempDate instanceof Date && !isNaN(tempDate);
}

exports.createReview = async (req, res, user_id, party_id, review_date, rating, review_title, review_text) => {
  // Validate the presence of each parameter
  const params = { user_id, party_id, review_date, rating, review_title, review_text };
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      res.writeHead(400, { "Content-Type": "application/json" });
      console.error(`${key} parameter is missing`);
      return res.end(JSON.stringify({ error: `${key} parameter is missing` }));
    }
  }
  if (!isValidDate(review_date)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Invalid review_date format. Please use ISO 8601 format, e.g., '2023-03-01T13:00:00Z'." }));
  }
  
  try {
    // Check if the user has already reviewed this party
    const existingReview = await reviewsCollection.findOne({
      party_id: party_id,
      user_id: user_id,
    });
    if (existingReview) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "User has already written a review for this party" }));
    }
      // Check if the party exists
    const partyExists = await partiesCollection.findOne({ _id: party_id });
    if (!partyExists) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Party does not exist" }));
    }

    // Create a new review document
    const review = {
      _id: crypto.randomUUID(),
      user_id: user_id,
      party_id: party_id,
      review_date: new Date(review_date),
      rating: parseInt(rating, 10),
      review_title: review_title,
      review_text: review_text
    };
    // Insert the review document into the 'reviews_co' collection
    console.log("Inserting review: ", review)
    const result = await reviewsCollection.insertOne(review);

    // Check if the insert operation was successful
    if(result.acknowledged === true && result.insertedId) {
      console.log(`Review successfully created with the ID: ${result.insertedId}`);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Review inserted successfully", id: result.insertedId }));
    } else {
      console.log("Failed to create review.");
    }

  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

exports.editReview = async (req, res, review_id, user_id, rating, review_title, review_text) => {
  // Validate the presence of each parameter
  const params = { review_id, user_id, rating, review_title, review_text };
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      res.writeHead(400, { "Content-Type": "application/json" });
      console.error(`${key} parameter is missing`);
      return res.end(JSON.stringify({ error: `${key} parameter is missing` }));
    }
  }
  try {
    // Check if the user has reviewed this party
    const existingReview = await reviewsCollection.findOne({
      _id: review_id,
      user_id: user_id,
    });
    if (!existingReview) {
      res.writeHead(400, { "Content-Type": "application/json" });
      console.log("User has not reviewed this party");
      return res.end(JSON.stringify({ error: "User has not written a review for this party or user-review mismatch" }));
    }
    // Proceed to update the review
    const parsedRating = parseInt(rating, 10);
    const result = await reviewsCollection.updateOne(
      { _id: review_id },
      { $set: { rating: parsedRating, review_title, review_text } }
    );

    // Check if the update was successful
    if (result.matchedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      console.log("No matching document found to update.");
      return res.end(JSON.stringify({ error: "Review not found or user mismatch." }));
    } else if (result.modifiedCount === 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log("Review found but no changes were made.");
      return res.end(JSON.stringify({ message: "No changes were made to the review." }));
    } else {
      // The review was successfully edited
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log("Review updated successfully.");
      return res.end(JSON.stringify({ message: "Review updated successfully." }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

exports.deleteReview = async (req, res, review_id, user_id) => {
  // Validate the presence of the 'review_id' and 'user_id' parameters
  const params = { review_id, user_id };
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      res.writeHead(400, { "Content-Type": "application/json" });
      console.error(`${key} parameter is missing`);
      return res.end(JSON.stringify({ error: `${key} parameter is missing` }));
    }
  }
  try {
    // Check if the user created this review
    const existingReview = await reviewsCollection.findOne({
      _id: review_id,
      user_id: user_id,
    });
    if (!existingReview) {
      res.writeHead(400, { "Content-Type": "application/json" });
      console.log("User did not write this review");
      return res.end(JSON.stringify({ error: "User did not write this review." }));
    }
    // Proceed to delete the review
    const result = await reviewsCollection.deleteOne({ _id: review_id });
    // Check if the review was deleted
    if (result.deletedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      console.log("No matching document found to delete.");
      return res.end(JSON.stringify({ error: "Review not found or user mismatch." }));
    } else {
      // The review was successfully deleted
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log("Review deleted successfully.");
      return res.end(JSON.stringify({ message: "Review deleted successfully." }));
    }
  
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}