import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://privateApiConnection:flvPD1xrTo8timic@cluster0.zxkreqk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

client.connect();
export const DatabaseClient = client.db("MyClassroom");
