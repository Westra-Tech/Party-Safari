// const dotenv = require("dotenv");
const path = require("path");

// Debug: Log the expected path of the .env file
const envPath = path.resolve(process.cwd(), '.env');
// console.log(`Looking for .env file at: ${envPath}`);
// // Attempt to load the .env file
// const result = dotenv.config();
// // Debug: Log the result of dotenv.config()
// if (result.error) {
//   console.error('Error loading .env file', result.error);
// } else {
//   console.log('.env file loaded successfully');
// }

const pword = 'L2nCWX3Z7de57hdN';
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://myra:${pword}@atlascluster.bvzvel0.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let partiesCollection;

// Connect to MongoDB and set up collections for use
async function dbConnect(){
    const db = mongoClient.db("Map");
    partiesCollection = await db.collection("Parties");
    console.log("connected to db");
};

async function pbh(i){
  //check if host_id exists
  if(!i){
    console.log("no id")
  }
  try {
    await dbConnect();
    const query = {HostID: "656d0bc954b790022840f8f2"};

    // const p = partiesCollection.find(query).toArray();
    let p = await partiesCollection.find({HostId: i}).toArray();
    return p;
  } catch (error) {
    console.log(error);
    return [];
  }

}
const id = "656d0bc954b790022840f8f2";

async function gogo(){
  await dbConnect();
  let parties = await pbh(id);
  await console.log(parties[0].Name);
  // updateMyEvents(parties);
}


async function updateMyEvents(arr){

  const divElement = document.getElementById('scrollable-events-data');

  arr.forEach((party) => {
    let customElement = document.createElement('party-component');
    customElement.setAttribute("title", party.Name);
    customElement.setAttribute("description", party.Description);
    customElement.setAttribute("startDate", party.StartDate.toString());

    divElement.appendChild(customElement); // append party element to event list
    console.log("hello");
  });
}


