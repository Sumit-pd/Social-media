const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const login = require('../middleware/login');

const User = mongoose.model('User');


router.get('/user/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            User.find({ _id: req.params.id })
                .populate("postedBy", "_id name")
                .then(posts => {
                    res.send()
                })
                .catch(err => res.status(404).json({ err: "user not found" }))
        })
        .catch(err => res.status(404).json({ err: "user not found" }))
})

module.exports = router