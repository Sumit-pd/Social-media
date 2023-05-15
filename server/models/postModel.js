const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types // this is for reference for the user
const postScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    like: [{
        // this is an array of all the people liking the post 
        type: ObjectId, // this will be storing id of the people liking the post
        ref: "User"
    }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: 'User' }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"

    }
})
mongoose.model("Post", postScheme)