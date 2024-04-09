const express = require("express");
const mongoose = require('mongoose');
let collection;
let db = require("../db/index").db.then(function(db){
    collection = db.collection("User");
    console.log(collection);
}); 
const UserSchema = require("../models/User");
const userModel = mongoose.model('User',UserSchema);
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.use(express.json());
const { ObjectId, FindCursor } = require("mongodb");
const saltRounds = 10;
//These are the user Route functions
//this is the post function for users that is the default. The new user is inserted into the db
async function createUser(req,res){
    console.log("received");
    try{
        //check to see if email exists. If it does exist, send 409 code and termninated
        let emailLookup = await collection.findOne({email: req.body.email});
        if(emailLookup !== null){
            console.log(emailLookup._id);
            res.status(409).send("User already exists");
            console.log("user exists");
            return
        }
        //hash the password using bcrypt for security purposes
        let hashed;
        /*bcrypt.genSalt(saltRounds,function(err,salt){
            bcrypt.hash(req.body.password,salt,function(err,hash){
                hashed = hash;
            })
        })*/
        hashed = await bcrypt.hash(req.body.password,saltRounds);
        //create new user using the UserSchema schema
        const newUser =  {
            username: req.body.username,
            email: req.body.email,
            password: hashed,
            ranking: 0,
            quizzesTaken: [],
        }
        //insert result into database and send status code of 200 back
        const result = await collection.insertOne(newUser);
        //const insertedDocument = await collection.findOne({ _id: result.insertedId });
        //console.log(insertedDocument);
        console.log(result);
        res.send(result).status(204);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
//This is the get all function for users that returns the json version of all the users available
async function getUsers (req,res){
    try{
        const result = await collection.find().toArray();
        res.send(result).status(200);
    }
    catch(error){
        res.status(500).send(error);
    }
}
//try to login user with JWT
async function loginUser(req,res){
    try{
        //look up via email
        const query = await collection.findOne({email:req.body.email});
        if(query === null){
            res.status(401).send("Invalid username");
        }
        const dbPassword = query.password;
        //check if password is true
        bcrypt.compare(req.body.password,dbPassword,function(err,result){
            //true
            //create jwt token from 
            console.log(result);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            if(result){
                const token = jwt.sign({userID: query._id}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '8h'});
                res.status(200).json(token);
            }
            else{
                res.status(401).send("wrong password. Please try again");
            }
            
        })
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
//function for getting a specific user's infromation from the mongodb database
async function getUser(req,res){
    console.log("get");
    try{
        let lookup = {_id: new ObjectId(req.params.userId)};
        const query = await collection.findOne(lookup);
        res.status(200).json({query});
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
//function for updating user profile
async function updateUserProfile(req,res){
    try{
        //const user = await collection.findOne(`_id:${req.body._id}`);
        //gather the body fields into username and email variables for update
        //console.log(req.body);
        const username = req.body.username;
        const email = req.body.email;
        //check to see if updated email exists in database. If it exists, return 409 code
        const emailLookup = await collection.findOne({email: req.body.email});
        if(emailLookup !== null){
            res.status(409).send("User already exists");
            return
        }
        //console.log(emailLookup);
        //update the object with the new info
        const query = {_id : new mongoose.Types.ObjectId(req.params.userId) };
        const update_profile_stuff = {
            $set:{
                "username" : username,
                "email" : email,
            }
        }
        let result = await collection.updateOne(query,update_profile_stuff);
        res.send(result).status(200);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
//delete users with this function
async function deleteUser(req,res){
    try{
        const id = req.params.userId;
        const query = new mongoose.Types.ObjectId(id)
        let result = await collection.deleteOne({_id: query});
        res.send(result).status(200);
    }catch(error){
        res.status(500).send(error);
    }    
}
router.get('/',getUsers);
router.get('/:userId',getUser);
router.post('/signup',createUser);
router.post('/login',loginUser);
router.put('/:userId',updateUserProfile);
router.delete('/:userId',deleteUser);

module.exports = {router};