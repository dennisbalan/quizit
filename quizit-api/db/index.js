//import {MongoClient, ServerApiVersion} from "mongodb";
const MongoClient = require("mongodb").MongoClient;
const ServerApiVersion = require("mongodb").ServerApiVersion;
//uri is kept secret from users
const uri = require('./url.js');
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
module.exports = {db}