const express = require('express');
const app = express();
const mongoose = require("mongoose")
require('./models/users')

const { MONGO_URI } = require("./keys")

const port = 3000;

mongoose.connect(MONGO_URI)
mongoose.connection.on('connected', () => {
    console.log("connected to mongoose");
});
mongoose.connection.on('error', (err) => {
    console.log("error", err);
});
//mongoose.connection.on is a method used in Mongoose, an Object-Document Mapper (ODM) for MongoDB, to listen for various events related to the database connection.
app.listen(port, () => {
    console.log("the server is hosted at port 3000");
});

app.get("/", (req, res) => {
    // this is a middleware
    res.send("hello world");
});


// if we add middleware in as the app.use it will be used after every route but if we need to use it for a specific route we need to pass it