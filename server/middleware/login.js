const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const mongoose = require('mongoose')
const user = mongoose.model("User")
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        // the is no authorization 
        return res.status(401).json({ "error": "you must be loggedIn" });
        //status 401 means unauthorized request from the user 
        //the status code in the 400s are client side errors
    }
    //authorization will be having a combination of string "Bearer " and a token 
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ "error": "you must be logged in" });
        }
        const { _id } = decoded; //we were sending some id while converting it into a token
        // console.log()
        user.findById(_id)
            .then(userData => {
                req.user = userData
                // the next should be written here because the above process will be taking some time for the execution
                next();
                //if this is written outside this part then it will save req.user as undefined 
            })
            .catch(err=>console.log(err))
    })

}