const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

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

let usersCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
    const db = mongoClient.db("Users");
    usersCollection = db.collection("User Data");
    console.log('db connected');
  };
  
exports.initLoggedStatus = async () => {
    try {
      console.log('begin make file');
      const userUsernameList = await usersCollection.find({}, { projection: { _id: 0, username: 1 } }).toArray();
      console.log(userUsernameList);
      const usernameToObj = {}
      
      userUsernameList.forEach((item) => {
        usernameToObj[item.username] = false;
      });
      
      // Convert object to JSON string
      const jsonData = JSON.stringify(usernameToObj, 2);
      
      // Write JSON string to a file
      fs.writeFile('usersLogged.json', jsonData, (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('JSON file created successfully');
        }
      });


    } catch (error) {
      console.error('Error fetching user emails:', error);
      return [];
    }
  };
  
  exports.updateLoggedStatus = async () => {
    
  };
