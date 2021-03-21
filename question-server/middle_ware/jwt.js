const dotnev = require('dotenv')
dotnev.config();
var jwt = require('jsonwebtoken');



const verify = (req, res, next) => {
    if (!req.originalUrl.includes('addUser') && !req.originalUrl.includes('sigIn')) {
        if (req.headers.authorization) {
            const data = jwt.verify(req.headers.authorization, process.env.MY_SECRET);
            if (!data) {
                res.status(404).send("error");
            }
            else {
                return next();
            }
        }
        else {
            res.status(404).send("error");
        }
    }
    else {
        return next();
    }

}
module.exports = { verify }