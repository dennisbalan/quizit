const QuestionSchema = require('./Question');

const mongoose = require('mongoose');
//QuizSchema is the shema for the quiz models and includes the quiz features
const QuizSchema = new mongoose.Schema({
    quiz_name: String,
    quiz_author: String,
    number_of_questions: Number,
    max_score: Number,
    quiz_questions:[{
        question: QuestionSchema,
    }
    ],
    published: Boolean,
    key: String
})
export {default as QuizSchema}