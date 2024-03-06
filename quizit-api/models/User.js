const AttemptSchema = require('./Attempt');
const QuizSchema = require('./Quiz');
const mongoose = require('mongoose');
//This is the UserSchema for the user. It includes boiler plate user information, the quizAttempts made,
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    ranking: Number,
    quizesTaken:[{
        attempt: AttemptSchema,
        number_of_attempts: Number
    }
    ],
    quizesCreated:[{
        quiz: QuizSchema,
    }],
    darkMode: Boolean,

})
module.exports = {UserSchema};