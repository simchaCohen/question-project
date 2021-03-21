const User = require('../model/user_model')
const dotnev = require('dotenv')
dotnev.config();
var jwt = require('jsonwebtoken');
// const Question = require('../model/question_model')

//add new user
const addUser = (req, res) => {
    const currentUser = new User(req.body)
    currentUser.save()
        .then((data) => {
            console.log("add user");
            createToken(req, res, data)
            // res.status(200).send(data)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send(err)
        })

}

const sigIn = (req, res) => {
    User.findOne({
        $and: [{ email: { $eq: req.body.email } }, { password: { $eq: req.body.password } }]
    }).then(data => {
        createToken(req, res, data)
        //    res.status(200).send(data)

    }).catch((err) => {
        res.status(404).send(err)
    })
}

const createToken = (req, res, data) => {
    const token = jwt.sign({ name: req.body.password, email: req.body.email }, process.env.MY_SECRET);
    // res.header('token', token, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ user: data, token: token });    // 
    // res.status(200).send(data)
}

module.exports = { addUser, sigIn }