// Sample data for tickets
// tickets_dummies.js
// this file creates some sample dummy tickets

const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

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
        _id: crypto.randomUUID(),
        user_id: "",
        party_id: "6f6ff140-c6eb-4b26-a49a-2ecae8a7b3b5",
        ticket_id: crypto.randomUUID(),
        status: "not attended",
    },
    {
        _id: crypto.randomUUID(),
        user_id: "", 
        party_id: "6f6ff140-c6eb-4b26-a49a-2ecae8a7b3b5",
        ticket_id: crypto.randomUUID(),
        status: "not attended",
    },
    {
      _id: crypto.randomUUID(),
      user_id: "", 
      party_id: "8763852a-bcad-4a9c-8a2b-a962255f2aad",
      ticket_id: crypto.randomUUID(),
      status: "not attended",
    },
    {
      _id: crypto.randomUUID(),
      user_id: "", 
      party_id: "8763852a-bcad-4a9c-8a2b-a962255f2aad",
      ticket_id: crypto.randomUUID(),
      status: "not attended",
    },
    
]);
  
