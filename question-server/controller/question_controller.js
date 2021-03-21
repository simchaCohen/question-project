const Question = require('../model/question_model');
const User = require('../model/user_model');

const getQuestion = (req, res) => {
    Question.find({ 'user_id': req.params.id })
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            console.log(err);
            res.status(404).send("error")
        })
}

const addQuestion = (req, res) => {
    curreQuestion = new Question(req.body);
    curreQuestion.save()
        .then(Question => {
            User.findByIdAndUpdate({ _id: req.body.user_id },
                { $push: { 'questions_list': Question._id } })
                .then(user => {
                    res.status(200).send(Question)
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).send("error with user")
                })
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("error with Question")
        })
}
const delQuestion = (req, res) => {
    User.update({}, { $pull: { Questions_list: req.params.id } }, { multi: true }).then(data => {
        Question.findByIdAndRemove(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => {
                console.log("error in Question", err)
                res.status(404).send(err)
            })
    }).catch(err => {
        res.status(404).send("error in user", err)
    })
}

const editQuestion = (req, res) => {
    Question.updateOne({ _id: req.params.id }, req.body, { new: true }).
        then((data) => { res.status(200).send(data) })
        .catch((err) => {
            console.log(err);
            res.status(404).send("error in update")
        })
}
module.exports = { addQuestion, delQuestion, editQuestion, getQuestion }