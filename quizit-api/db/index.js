import {MongoClient, ServerApiVersion} from "mongodb";
const uri = "mongodb+srv://dbalan2234:GT4561992@cluster0.mpnik7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, 
    {ServerApi: 
        {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    }
);
try{
    await client.connect();
}catch(error){
    console.log(error);
}
let db = client.connect("Cluster0");
export default db;