
import { MongoClient, MongoClientOptions } from "mongodb";
let client
let clientPromise: Promise<MongoClient>
const uri:any= process.env.MONGODB_URI;
// ... other code
try {
  client = new MongoClient(uri, {});
  clientPromise = client.connect().then(client => {
    console.log("MongoDB Connected"); // Added log
    return client;
  });
} catch (error) {
  console.error("MongoDB Connection Error:", error); // Added error log
  throw error;
}

export default clientPromise

