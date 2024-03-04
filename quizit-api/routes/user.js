const express = require("express");
const mongoose = require('mongoose');
const { default: db } = require("../db");
const userModel = mongoose.model('User',UserSchema);
const router = express.Router();
const collection = db.collection("User");
//this is the post function for users that is the default. The new user is inserted into the db
async function createUser(req,res){
    try{
        const newUser =  new UserActivation({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            quizesTaken: [],
            ranking: 0

        })
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
        const result = await collection.find({}).toArray();
        res.send(result).status(200);
    }
    catch(error){
        res.status(500).send(error);
    }
}
router.get('/',getUsers);
router.get('/:userId',getUser);
router.post('/',createUser);
router.put('/:userId',updateUser);