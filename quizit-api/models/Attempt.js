const mongoose = require("mongoose");
const AttemptSchema = new mongoose.Schema({
    quiz_id: String,
    score: Number,
    dateTaken: String,
    finished: Boolean,
})
module.exports = {AttemptSchema};