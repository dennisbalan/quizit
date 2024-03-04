import { QuizSchema } from './Quiz';
const mongoose = require('mongoose');
//This is the UserSchema for the user
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    ranking: Number,
    quizesTaken:[{
        quizId: String,
        score: Number,
        dateTaken: String,
        attempts: Number
    }
    ],
    quizesCreated:[{
        quiz: QuizSchema,
    }],
    darkMode: Boolean,

})
export {default as UserSchema}