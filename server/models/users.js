const mongoose = require('mongoose')
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types // it is a datatype for refrence for the users
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic : {
        type : String ,
        default :"https://res.cloudinary.com/sumit21/image/upload/v1685267254/images_ssfktw.png"
    },
    followers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: "User"
        }
    ]
});
mongoose.model('User', userSchema);
