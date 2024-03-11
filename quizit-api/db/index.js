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
async function run() {
    try{
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        db = client.db("test");
        console.log(client);
        console.log(db);
    }catch(error){
        console.log(error);
    }
};
run();
console.log(db);
module.exports = {db}