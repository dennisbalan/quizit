import { AnswerSchema } from './Answer';

const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    question_number: Number,
    question_description: String,
    picture_enabled: Boolean,
    picture_link: String,
    answers: [{
        description: Text,
        correct: Boolean
    }]
})
export {default as QuestionSchema}