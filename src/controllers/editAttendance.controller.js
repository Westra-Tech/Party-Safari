const dotenv = require("dotenv");
const path = require("path");
console.log("editAttendance.controller called");
// Debug: Log the expected path of the .env file
const envPath = path.resolve(process.cwd(), '.env');
console.log(`Looking for .env file at: ${envPath}`);
// Attempt to load the .env file
const result = dotenv.config();
// Debug: Log the result of dotenv.config()
if (result.error) {
  console.error('Error loading .env file', result.error);
} else {
  console.log('.env file loaded successfully in editAttendance controller');
}

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

let rsvpsCollection;

// Connect to MongoDB and set up collections for use
exports.dbConnect = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`;
  const mongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await mongoClient.connect();
    const db = mongoClient.db("dummy_db");
    rsvpsCollection = db.collection("rsvps_co");
    console.log("db.collection to rsvps_co");
    console.log("Connected to the database");
    return rsvpsCollection; // Return the initialized collection
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Propagate the error
  }
};

exports.deleteRsvp = async (req, res, party_id, user_id) => {
  console.log('deleteRsvp controller called');
  // Validate the presence of the 'party_id' and 'user_id' parameters
  if (!party_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    console.error('party_id is missing');
    return res.end(JSON.stringify({ error: "party_id is missing" }));
  }
  if (!user_id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    console.error('user_id is missing');
    return res.end(JSON.stringify({ error: "user_id parameter is missing" }));
  }

  try {
    // Ensure rsvpsCollection is initialized
    if (!rsvpsCollection) {
      throw new Error('rsvpsCollection is not initialized');
    }

    // Check if the user has RSVPed to the party
    const existingRsvp = await rsvpsCollection.findOne({
      party_id: new ObjectId(party_id),
      user_id: new ObjectId(user_id),
    });

    if (!existingRsvp) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "RSVP not found" }));
    }

    // If the RSVP exists, delete it
    await rsvpsCollection.deleteOne({
      party_id: new ObjectId(party_id),
      user_id: new ObjectId(user_id),
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "RSVP deleted successfully" }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

// Function to render HTML with RSVPs data
exports.displayRsvpsPage = async (req, res) => {
    console.log('displayRsvpsPage controller called');
  
    try {
      // Ensure rsvpsCollection is initialized
      if (!rsvpsCollection) {
        throw new Error('rsvpsCollection is not initialized');
      }
  
      // Retrieve all RSVPs
      const allRsvps = await rsvpsCollection.find().toArray();
  
      // Build HTML with RSVPs data
      const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RSVPs Table</title>
        <style>
          :root {
            --bg: #404040;
            --bg-darkened: #333333;
            --orange: #f2af6f;
            --darkened-orange: #f0a35c;
            --blue: #6cd7f4;
            --green: #baf26f;
            --darkened-green: #99eb2d;
            --almost-white: rgb(226, 226, 226);
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: var(--bg);
            color: var(--almost-white);
          }

          .container {
            text-align: center;
          }

          table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
          }

          th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid var(--almost-white);
          }

          th {
            background-color: var(--bg-darkened);
          }

          h1 {
            color: var(--blue);
          }

          .menu_container {
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            display: flex;
            width: 100px;
            background-color: var(--almost-white);
            position: absolute;
            transform: translate(-50%, 50%);
            z-index: 9999;
            right: 0;
          }

          .menu_container ul {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
          }

          .menu_container li {
            display: block;
          }

          .menu_container li button {
            display: block;
            text-align: center;
            font-weight: bold;
            font-size: 15px;
            letter-spacing: 3px;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            padding: 14px 16px;
            text-decoration: none;
            color: black;
            border: none;
            width: 100%;
          }

          .menu_container li button:hover {
            background-color: var(--bg-darkened);
            color: var(--almost-white);
          }
        </style>
      </head>
      <body>
        <nav-bar></nav-bar>
        <div class="container">
          <h1>RSVPs Table</h1>
          <table>
            <thead>
              <tr>
                <th>Party ID</th>
                <th>User ID</th>
                <th>RSVP Date</th>
              </tr>
            </thead>
            <tbody>
              ${allRsvps.map(rsvp => `
                <tr>
                  <td>${rsvp.party_id}</td>
                  <td>${rsvp.user_id}</td>
                  <td>${rsvp.rsvp_date}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <site-footer></site-footer>
      </body>
    </html>
  `;

  
      // Send the HTML as the response
      res.setHeader('Content-Type', 'text/html');
      res.write(html);
      res.end();
    } catch (error) {
      console.error(error);
      // Send an error response
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  };