//we should always try to create routes in different folder 
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello World");
});
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body; // this is something we get from the frontend part
    if(!name || !email || !password ){
        return res.status(422).json({error:"please fill all the details"})
        //status 422 means that the server has understood the details but cannot process it
    }
    else{
        res.json({message : "succesfully sent"})
    }
});
module.exports = router