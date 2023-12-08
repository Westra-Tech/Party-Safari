const dotenv = require("dotenv");
const path = require("path");

// Debug: Log the expected path of the .env file
const envPath = path.resolve(process.cwd(), '.env');
// const envPath = path.resolve(path.dirname(process.cwd()), '.env');
// Attempt to load the .env file
const result = dotenv.config({ path: envPath });
// Debug: Log the result of dotenv.config()
if (result.error) {
  console.error('Error loading .env file', result.error);
} else {
  console.log('.env file loaded successfully in scan-tickets.controller.js');
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
let ticketsCollection;

// console.log("hello");
// connect();
// console.log("connected");
// updateTicketStatus(null, null, "65651f8424e953232b1d4e63");
// console.log("updated");
// disconnect();
// console.log("done");

// Connect to MongoDB and set up collections for use
async function connect(){
    const db = mongoClient.db("dummy_db");
    ticketsCollection = db.collection("tickets_co");
};

async function disconnect(){
    mongoClient.close();
}

// id is the _id of the ticket object in database
async function updateTicketStatus(req, res, id){
    try{
        const originalTicket = { _id: new ObjectId(id) };

        const updatedField = { $set: { status: "attended" } };

        const result = await ticketsCollection.updateOne(originalTicket, updatedField);
        // console.log(result);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({message: "Ticket updated successfully"}));
    }catch(e){
        // console.log("failed");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ e: "Internal Server Error" }));
    }
    

}

module.exports = {
    connect: connect,
    disconnect : disconnect,
    updateTicketStatus: updateTicketStatus
}


