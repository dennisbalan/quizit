const express = require("express");
const mongoose = require('mongoose');
const { default: db } = require("../db");
const userModel = mongoose.model('User',UserSchema);
const router = express.Router();
const jwt = require("jsonwebtoken");
const collection = db.collection("User");
const bcrypt = require("bcrypt");
const { ObjectId, FindCursor } = require("mongodb");
const saltRounds = 10;
//These are the user Route functions
//this is the post function for users that is the default. The new user is inserted into the db
async function createUser(req,res){
    try{
        //check to see if email exists. If it does exist, send 409 code and termninated
        const emailLookup = await collection.findOne(`email:${req.body.email}`);
        if(emailLookup !== null){
            res.status(409).send("User already exists");
            return
        }
        //hash the password using bcrypt for security purposes
        bcrypt.genSalt(saltRounds,function(err,salt){
            bcrypt.hash(req.body.password,salt,function(err,hash){
                req.body.password = hash;
            })
        })
        //create new user using the UserSchema schema
        const newUser =  new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            quizesTaken: [],
            ranking: 0
        })
        //insert result into database and send status code of 200 back
        const result = await collection.insertOne(newUser);
        res.send(result).status(200);
    }
    catch(error){
        res.status(500).send(error);
    }
}
//This is the get all function for users that returns the json version of all the users available
async function getUsers (req,res){
    try{
        const result = await collection.findOne({}).toArray();
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
        const query = await collection.findOne(`email:${req.body.email}`);
        if(query === null){
            res.status(401).send("Invalid username");
        }
        const dbPassword = query.password;
        //check if password is true
        bcrypt.compare(req.body.password,dbPassword,function(err,result){
            //true
            //create jwt token from 
            const token = jwt.sign({userID: query._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '8h'});
            res.status(200).json({token});
        })
        //Login failed, send 401 code
        bcrypt.compare(req.body.password,dbPassword,function(err,result){
            //false
            res.status(401).send("wrong password. Please try again");
        })
    }catch(error){
        res.status(500).send(error);
    }
}
//function for getting a specific user's infromation from the mongodb database
async function getUser(req,res){
    try{
        const query = await collection.findOne(`_id:${req.body._id}`);
        res.status(200).json({query});
    }
    catch(error){
        res.status(500).send(error);
    }
}
//function for updating user profile
async function updateUserProfile(req,res){
    try{
        //const user = await collection.findOne(`_id:${req.body._id}`);
        //gather the body fields into username and email variables for update
        const {username} = req.body.username;
        const {email} = req.body.email;
        //check to see if updated email exists in database. If it exists, return 409 code
        const emailLookup = await collection.findOne(`email:${req.body.email}`);
        if(emailLookup !== null){
            res.status(409).send("User already exists");
            return
        }
        //update the object with the new info
        const query = {_id : req.body._id };
        const update_profile_stuff = {
            $set:{
                username: username,
                email: email,
            }
        }
        let result = await collection.updateOne(query,update_profile_stuff);
        res.send(result).status(200);
    }
    catch(error){
        res.status(500).send(error);
    }
}
//delete users with this function
async function deleteUser(req,res){
    try{
        const {id} = req.params._id;
        let result = await collection.deleteOne(`_id:${id}`);
        res.send(result).staus(200);
    }catch(error){
        res.status(500).send(error);
    }
    
    
}
router.get('/',getUsers);
router.get('/:userId',getUser);
router.post('/signup',createUser);
router.post('/login',loginUser);
router.put('/:userId',updateUserProfile);
router.delete('/users/:userId',deleteUser);

module.exports = {router};