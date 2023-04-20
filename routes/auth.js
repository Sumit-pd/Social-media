//we should always try to create routes in different folder 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


const User = mongoose.model('User',)

router.get('/', (req, res) => {
    res.send("hello World");
});
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
            const user = new User({
                email,
                name,
                password
            });
            user.save()
                .then(user => {
                    res.json({ "message": "user save sucessfully" })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});
module.exports = router