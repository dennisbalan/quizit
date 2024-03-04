import { QuestionSchema } from './Question';

const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
    quiz_name: String,
    quiz_author: String,
    number_of_questions: Number,
    max_score: Number,
    quiz_questions:[{
        question: QuestionSchema
    }
    ],
    published: Boolean,
    key: String
})
export {default as QuizSchema}