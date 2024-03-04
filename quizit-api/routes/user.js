const express = require("express");
const mongoose = require('mongoose');
const { default: db } = require("../db");
const userModel = mongoose.model('User',UserSchema);
const router = express.Router();
const collection = db.collection("User");
const bcrypt = require("bcrypt");
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
async function getUsers(req,res){
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
router.get('/',getUsers);
router.get('/:userId',getUser);
router.post('/signup',createUser);
router.post('/login',loginUser);
router.put('/:userId',updateUser);