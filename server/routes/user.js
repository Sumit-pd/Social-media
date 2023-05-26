const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const login = require('../middleware/login');

const User = mongoose.model('User');
const Post = mongoose.model('Post')


router.get('/user/:id',  login, (req, res) => {
    // console.log(req.params.id)
    User.findOne({ _id: req.params.id })
        .select("-password") //this line will remove the password from the data
        .then(user => {
            if (!user) {
                return res.status(404).json({ err: "User not found" });
            }
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .then(posts => {
                    res.send({ user, posts });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ err: "Internal server error" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: "Internal server error" });
        });
});


module.exports = router