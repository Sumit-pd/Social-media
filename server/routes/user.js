const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const login = require('../middleware/login');

const User = mongoose.model('User');
const Post = mongoose.model('Post')


router.get('/user/:id', login, (req, res) => {
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


/*
additional content
-when sumit follows amit the following of sumit increase by 1 and amit's followers will increase by one
-in sumit's following we will be adding amit's id 
-in amit's followers we will be adding sumit's id
*/
router.put('/follow', login, (req, res) => {
    /* 
    -this will be an update request
    -the userid of the user to be followed will be given by the frontend
    -the below update command will update the collection of the user model with req.body.followId  
    -pushing in the followers array of the req.bod.followId 
    */
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id } // the user who is loggedIn
    },
        { new: true }// this ensures that mongodb will return a new document
    )
        .then(result => {
            // now we will update the loggedIn user following array
            User.findByIdAndUpdate(req.user._id, {
                $push: { following: req.body.followId },
            }, { new: true }).select("-password") // mongoose will return a new document 
                .then(newResult => {
                    res.json(newResult)
                })
                .catch(err => {
                    console.log(err)
                    return res.json(err)
                })
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({ error: err });
        })
})
router.put('/unfollow', login, (req, res) => {
    /* 
    -this will be an update request
    -the userid of the user to be followed will be given by the frontend
    -the below update command will update the collection of the user model with req.body.followId  
    -pushing in the followers array of the req.bod.followId 
    */
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id } // the user who is loggedIn
    },
        { new: true }// this ensures that mongodb will return a new document
    )
        .then(result => {
            // now we will update the loggedIn user following array
            User.findByIdAndUpdate(req.user._id, {
                $pull: { following: req.body.unfollowId },
            }, { new: true }) // mongoose will return a new document 
                .then(newResult => {
                    res.json(newResult)
                })
                .catch(err => {
                    console.log(err)
                    return res.json(err)
                })
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({ error: err });
        })
})
module.exports = router