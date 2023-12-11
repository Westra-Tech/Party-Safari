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

const db = mongoClient.db("Parties");

db.createCollection("Tickets", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "party_id", "ticket_id", "status"],
            properties: {
                // _id: {
                //     bsonType: "objectId",
                //     description: "_id is the primary key and must be an ObjectId"
                // },
                user_id: {
                    bsonType: "string",
                    description: "user_id is required and must be an ObjectId"
                },
                party_id: {
                    bsonType: "objectId",
                    description: "party_id is required and must be an ObjectId"
                },
                ticket_id: {
                    bsonType: "string",
                    description: "ticket_id is required and must be a string"
                },
                status: {
                    bsonType: "string",
                    description: "status is required and must be a string"
                }
            }
        }
    }
});
