const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const user_route = require('./route/user_route')
const question_route = require('./route/question_route')
const jwtMidlleWare = require('./middle_ware/jwt');


dotenv.config()
app.use(bodyParser.json());
// express.json()
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => console.log('connect!!'))
    .catch((err) => console.log(`error!!  ${err}`))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});

// app.use(jwtMidlleWare.createToken)
app.use(jwtMidlleWare.verify)
app.use('/user', user_route)
app.use('/question', question_route)

app.listen(process.env.PORT, () => {
    console.log('listen! ',process.env.PORT);
})

