//we should always try to create routes in different folder 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const User = mongoose.model('User',)


router.post('/signup', (req, res) => {
    const { name, email, password } = req.body; // this is something we get from the frontend part
    if (!name || !email || !password) {
        return res.status(422).json({ error: "please fill all the details" })
        //status 422 means that the server has understood the details but cannot process it
    }
    // we are checking if the email provided from the frontend is already taken by a existing user
    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                // we found the user so we will return an error
                return res.status(422).json({ "error": "the email is already taken" });
            }
            bcrypt.hash(password, 12) //higher the value of the second variable the more the password will be hashed
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        name,
                        password: hashedPassword
                    });
                    user.save()
                        .then(user => {
                            res.json({ "message": "user save sucessfully" })
                        })
                        ``.catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    // now we will find the email in the user collection
    User.findOne({ email: email })
        .then(user => { // user will be an object
            if (!user) {
                return res.status(433).json({ "error": "invalid email or password" })
            }
            bcrypt.compare(password, user.password)
                .then(isMatched => { // ismatched will be boolean value
                    if (!isMatched) {
                        return res.status(433).json({ "error": "invalid email or password" })
                    }
                    // // return res.json({ "message": "sucessfully signed in" });
                    // /* we need to send a personalize token to the user for accessing a personalized token
                    //     we will be using a jwt(jsonwebtoken*/
                    const { JWT_SECRET } = require("../keys")
                    // // // this is unique part that will be used to create a token
                    const token = jwt.sign({ _id: user._id }, JWT_SECRET)
                    // // // this will create a token
                    const { _id, name, email, followers, following } = user
                    res.json({
                        token, user1: {
                            _id, name, email,followers, following
                        }
                    })
                    // res.json({"message":"done"})
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});
module.exports = router