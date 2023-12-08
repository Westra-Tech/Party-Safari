// Sample data for tickets
// tickets_dummies.js
// this file creates some sample dummy tickets

const dotenv = require("dotenv");
const path = require("path");

// console.log(path.dirname(process.cwd()));

// Debug: Log the expected path of the .env file
const envPath = path.resolve(path.dirname(process.cwd()), '.env');
// console.log(envPath);
console.log(`Looking for .env file at: ${envPath}`);
// Attempt to load the .env file
const result = dotenv.config({ path: envPath });
console.log(result);
// Debug: Log the result of dotenv.config()
if (result.error) {
  console.error('Error loading .env file', result.error);
} else {
  console.log('.env file loaded successfully');
}

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


// Connect to MongoDB and set up collections for use
  const db = mongoClient.db("dummy_db");
  const tickets_co = db.collection("tickets_co");


tickets_co.insertMany([
    
    // end of semester bash
    {
        user_id: new ObjectId("6557d49e3a8bf89eb36bb17a"),
        party_id: new ObjectId("6557d93c0bb1397e7d44075e"),
        ticket_id: "ticket 1",
        status: "not attended",
    },
    {
        user_id: new ObjectId("6557d49e3a8bf89eb36bb17b"), 
        party_id: new ObjectId("6557d93c0bb1397e7d44075e"),
        ticket_id: "ticket 2",
        status: "not attended",
    },
    
]);
  
