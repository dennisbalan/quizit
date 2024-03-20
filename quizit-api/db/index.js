//import {MongoClient, ServerApiVersion} from "mongodb";
const MongoClient = require("mongodb").MongoClient;
const ServerApiVersion = require("mongodb").ServerApiVersion;
//uri is kept secret from users
const uri = require('./url.js').uri;
const client = new MongoClient(uri, 
    {ServerApi: 
        {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    }
);
let db;
console.log(db);
async function run() {
    try{
        await client.connect();
        await client.db("Quizit").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");  
        //console.log(client);
        //console.log(db);
        db = client.db("Quizit");
        let f = await db.listCollections().toArray();
        //console.log(f);
       
    }catch(error){
        console.log(error);
    }
    return db;
};


//console.log(client.db.collection("users"));
module.exports.db = new Promise(function(resolve, reject){
    db = run();
    resolve(db);
})