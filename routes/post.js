const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const login = require('../middleware/login')

const Post = mongoose.model('Post')


router.post('/createpost', login, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({ "error": "please fill the required fields " })
        //422 means unprocessable data
    }
    // console.log(req.user)
    // res.send("ok");
    req.user.password = undefined;
    //this will avoid saving of password in the post database
    const post = new Post({
        title,
        body,
        postedBy: req.user // this includes the details of the user who posted 

    })
    post.save()
        .then(result => {
            res.json({ "post": "done sucessfully" })
        })
        .catch(err => console.log(err))

})

router.get('/allpost', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name") // this will avoid the getting of only objectId and return us the name and id as we are passing them in the arguments
        .then(posts => {
            res.json({ posts })
        })

})


module.exports = router