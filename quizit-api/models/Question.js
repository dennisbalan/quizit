const AnswerScehma = require('./Answer');

const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    question_number: Number,
    question_description: String,
    picture_enabled: Boolean,
    picture_link: String,
    answers: [{
        description: String,
        correct: Boolean
    }]
})
module.exports = {QuestionSchema};