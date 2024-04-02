const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
router.use(express.json());
let collection;
let db = require("../db/index").db.then(function(db){
    collection = db.collection("Quiz");
    console.log(collection);
}); 
async function createQuiz(req,res){
    try{
        const newQuiz = {
            quiz_name: req.body.quiz_name,
            quiz_author: req.body.quiz_author,
            published: false,
            number_of_questions: 0
        }
        const result = collection.insertOne(newQuiz);
        res.status(204).send(result);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}
async function publishQuiz(req,res){
    try{
        const query = collection.findOne({_id: new mongoose.Types.ObjectId(req.params._id)});
        if(query !== null){
            const id_lookup = {_id: new mongoose.Types.ObjectId(req.params._id)};
            const publish_object = {
                $set:{
                    "published": true
                }
            }
            let result = collection.updateOne(id_lookup,publish_object);
            res.status(200).sendd(result);
        }
        res.status(409).send("quiz does not exist");

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}