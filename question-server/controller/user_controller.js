const User = require('../model/user_model')
const dotnev = require('dotenv')
dotnev.config();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

//add new user
const addUser = (req, res) => {
    let password = new Date().getTime()
    password = password.toString().slice(-8)
    const currentUser = new User({ ...req.body, password: password })
    currentUser.save()
        .then((data) => {
            sendMail(data.email, password)
            res.status(200).send(data)
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

    }).catch((err) => {
        res.status(404).send(err)
    })
}

const createToken = (req, res, data) => {
    const token = jwt.sign({ name: req.body.password, email: req.body.email }, process.env.MY_SECRET);
    res.status(200).json({ user: data, token: token });    // 
}

const sendMail = (to, password) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smartboardapp10@gmail.com',
            pass: 60829912
        }
    });

    var mailOptions = {
        from: 'smartboardapp10@gmail.com',
        to: to,
        subject: 'Welcom To Question Site',
        text: 'your password is: ' + password
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
}
module.exports = { addUser, sigIn }