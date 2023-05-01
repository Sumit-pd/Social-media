const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const login = require('../middleware/login')

const Post = mongoose.model('Post')


router.post('/createpost', login, (req, res) => {
    const { title, body, url } = req.body;
    if (!title || !body || !url) {
        // console.log(title, body, url)
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
        photo: url,
        postedBy: req.user // this includes the details of the user who posted 

    })
    post.save()
        .then(result => {
            res.json({ "message": "done sucessfully" })
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

router.get('/mypost', login, (req, res) => {
    // we are making this a protected one as we need top access the req.user that is present in the login middleware
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "name _id")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => console.log(err))
})


router.put('/like', login, (req, res) => {
    Post.findByIdAndUpdate(req.body.post, { // this will be sent from the frontend
        $push:{likes : req.user._id} // this will push the element to the back of the likes array
    }, {
        new : true // this will make mongodb to return a new file
    })
    .exec((err , result ) =>{
        if(err){
            res.status(422).json({"error" : err})
        }
        else{
            res.json(result)
        }
    })
})
router.put('/unlike', login, (req, res) => {
    Post.findByIdAndUpdate(req.body.post, { // this will be sent from the frontend
        $pull:{likes : req.user._id} // this will push the element to the back of the likes array
    }, {
        new : true // this will make mongodb to return a new file m , if we don't do then mongodb will return an old record
    })
    .exec((err , result ) =>{
        if(err){
            res.status(422).json({"error" : err})
        }
        else{
            res.json(result)
        }
    })
})


module.exports = router