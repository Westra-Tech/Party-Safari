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

let usersCollection;
let usernameActive;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
    const db = mongoClient.db("Users");
    usersCollection = db.collection("User Data");
  };
  
exports.findUser = async () => {   
        fs.readFile('usersLogged.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading file:', err);
          }
        const jsonData = JSON.parse(data);
          console.log('checking for logged in user');
          // Update a specific field
          for (const field in jsonData) {
            if (jsonData[field] === true) {
                usernameActive = field;
            }
            }
          console.log('not found')
        });

    

  try {
    // Fetch the user details using the provided 'username' and 'password'

    const user = await usersCollection.findOne({usernameActive});
    if (user) {
      // User found, return the user_id
        return user;
    } else {
      // No user found with the given username and password
        return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
