const mongoose = require('mongoose');
const AnswerSchema = new mongoose.Schema({
    text: String,
    correct: Boolean
})
export {default as AnswerSchema}