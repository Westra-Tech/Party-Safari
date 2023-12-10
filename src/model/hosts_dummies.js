// Sample data for tickets
// tickets_dummies.js
// this file creates some sample dummy tickets

const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
  const hosts_co = db.collection("hosts_co");


hosts_co.insertMany([
    
    {
        _id: uuidv4(),
        host_id: uuidv4(),
        parties: [],
        name: "John Doe",
        description: "Experienced party host specializing in themed events.",
        collegeAffiliation: "XYZ University",
        socialMediaLinks: [
            "https://www.instagram.com/johndoe",
            "https://www.facebook.com/johndoe"
        ],
        reviews: ["review_id_1", "review_id_2"]
    },
    {
        _id: uuidv4(),
        host_id: uuidv4(),
        parties: [],
        name: "BashBros",
        description: "Just a pair of brothers looking to create a fun time!",
        collegeAffiliation: "ABC College",
        socialMediaLinks: [
            "https://www.instagram.com/BashBros",
            "https://www.facebook.com/BashBros"
        ],
        reviews: ["review_id_3", "review_id_4"]
    },
    {
        _id: uuidv4(),
        host_id: uuidv4(),
        parties: ["b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441"],
        name: "Phi Kappa",
        description: "The best frat out there!",
        collegeAffiliation: "Rutgers University",
        socialMediaLinks: [
            "https://www.instagram.com/SigmaEpsilon",
            "https://www.facebook.com/SigmaEpsilon"
        ],
        reviews: [
            "fd2601b7-80ba-4368-b46b-64695972b1e1",
            "905de55c-2510-406d-afd7-690a7a8e2fd2",
            "e51bd90f-300a-4fdd-b6c8-a9b674da8bba"
        ]
    },
       
]);
  
