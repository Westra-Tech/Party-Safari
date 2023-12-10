// tickets_co.js
// this file creates the collection (that doesn't exist yet) in dummy_db

const dotenv = require("dotenv");
const path = require("path");

console.log(path.dirname(process.cwd()));

// Debug: Log the expected path of the .env file
const envPath = path.resolve(path.dirname(process.cwd()), '.env');
console.log(envPath);
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

const db = mongoClient.db("dummy_db");

db.createCollection("hosts_co", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["host_id", "parties", "name", "description", "collegeAffiliation", "socialMediaLinks", "reviews"],
            properties: {
                host_id: {
                    bsonType: "string",
                    description: "_id is the primary key and must be a string (UUID)"
                },
                parties: {
                    bsonType: "array",
                    items: {
                        bsonType: "string"
                    },
                    description: "parties is required and must be an array of strings (UUID)"
                },
                name: {
                    bsonType: "string",
                    description: "name is required and must be a string"
                },
                description: {
                    bsonType: "string",
                    description: "description is required and must be a string"
                },
                collegeAffiliation: {
                    bsonType: "string",
                    description: "collegeAffiliation is required and must be a string"
                },
                socialMediaLinks: {
                    bsonType: "array",
                    items:{
                        bsonType: "string"
                    },
                    description: "socialMediaLinks is required and must be an array of strings"
                },
                reviews: {
                    bsonType: "array",
                    items:{
                        bsonType: "string"
                    },
                    description: "reviews is required and must be an array of strings"
                }
            }
        }
    }
});
