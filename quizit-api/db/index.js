import {MongoClient, ServerApiVersion} from "mongodb";
//uri is kept secret from users
import uri from "./url";
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