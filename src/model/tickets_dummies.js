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
  const db = mongoClient.db("Parties");
  const tickets_co = db.collection("Tickets");


tickets_co.insertMany([
    
    // POST FINALParty, Sigma Study Party
    {
        _id: crypto.randomUUID(),
        user_id: "45fcd7ed-703d-4153-b427-01dad1e65fd4", 
        party_id: new ObjectId("655cfa10a2d6fb0a5d763b87"), 
        ticket_id: crypto.randomUUID(),
        status: "not attended",
    },
    {
        _id: crypto.randomUUID(),
        user_id: "3d6985d6-2f06-493d-82d1-d808e4bd7218", 
        party_id: new ObjectId("655cfa10a2d6fb0a5d763b87"), 
        ticket_id: crypto.randomUUID(),
        status: "not attended",
    },
    {
      _id: crypto.randomUUID(),
      user_id: "45fcd7ed-703d-4153-b427-01dad1e65fd4", 
      party_id: new ObjectId("6572798c9dac8bc06c31ba5f"), 
      ticket_id: crypto.randomUUID(),
      status: "not attended",
    },
    {
      _id: crypto.randomUUID(),
      user_id: "3d6985d6-2f06-493d-82d1-d808e4bd7218", 
      party_id: new ObjectId("6572798c9dac8bc06c31ba5f"), 
      ticket_id: crypto.randomUUID(),
      status: "not attended",
    }
    
]);
  
