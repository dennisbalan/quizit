const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/user.js').router;
//const { UserSchema } = require('./models/User');
const { QuestionSchema } = require('./models/Question');
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get('/status', (req,res) => {
    const status = {
        Status: "Running"
    }
    res.send(status);
})

const questionModel = mongoose.model('Question',QuestionSchema);
app.use('/user',users);
//app.get('/quiz/:quizId',getQuiz);
//app.post('/quiz',createQuiz);
//app.put('/quiz/:quizId',updateQuizStatus);
app.listen(PORT,() => console.log(`Live on local host ${PORT}`));