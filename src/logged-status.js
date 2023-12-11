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
      //console.log(userUsernameList);
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
  
  exports.updateLoggedStatus = async (username) => {
    fs.readFile('usersLogged.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
      
        try {
          // Parse the JSON data
          const jsonData = JSON.parse(data);
            console.log('udpating field');
          // Update a specific field
          jsonData[username] = true; // Replace "user2" with the field name you want to update
      
          // Convert updated JSON back to string
          const updatedJsonData = JSON.stringify(jsonData, null, 2);
      
          // Write updated JSON back to the file
          fs.writeFile('usersLogged.json', updatedJsonData, 'utf8', (err) => {
            if (err) {
              console.error('Error writing file:', err);
            } else {
              console.log('File updated successfully');
            }
          });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
  };

  exports.findLoggedIn = async () => {
    fs.readFile('usersLogged.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return false;
      }
    const jsonData = JSON.parse(data);
      console.log('checking for logged in user');
      // Update a specific field
      for (const field in jsonData) {
        if (jsonData[field] === true) {
            if(found == true){
                return field
            }
            found == true;
        }
        }
      console.log('not found')
      return found;
    });
  };


    exports.check = async () => {
        fs.readFile('usersLogged.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return false;
            }
        let found = false;
        let foundcount = 0;
        const jsonData = JSON.parse(data);
          console.log('checking for logged in user');
          // Update a specific field
          for (const field in jsonData) {
            if (jsonData[field] === true) {
                console.log('found');
                if(found == true){
                    this.initLoggedStatus();
                    return false;
                }
                found == true;
            }
            }
        console.log('not found')
        return found;
        });
    }

  exports.updateLoggedStatusFalse = async () => {
    fs.readFile('usersLogged.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        try{
         // Parse the JSON data
          const jsonData = JSON.parse(data);
          console.log('updating field');
          // Update a specific field
          for (const field in jsonData) {
            if (jsonData[field] === true) {
                jsonData[field] = false
                // Convert updated JSON back to string
                const updatedJsonData = JSON.stringify(jsonData, null, 2);
                // Write updated JSON back to the file
                fs.writeFile('usersLogged.json', updatedJsonData, 'utf8', (err) => {
                    if (err) {
                    console.error('Error writing file:', err);
                    } else {
                    console.log('File updated successfully');
                    }
                });
                    }
            }
            console.log("User logout successful");
            //res.writeHead(200, { "Content-Type": "application/json" });
            //return 'OK';
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log("User logout unsuccessful");
          //res.writeHead(401, { "Content-Type": "application/json" });
          //return 'BAD';
        };
  });
};
