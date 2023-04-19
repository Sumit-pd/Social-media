const express = require('express');
const app = express();
const mongoose = require("mongoose")
require('./models/users')

app.use(express.json()) // this is middleware as we want all the data to be passed in json
//also this should be before the requiring of the the routes
app.use(require("./routes/auth"))

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



// if we add middleware in as the app.use it will be used after every route but if we need to use it for a specific route we need to pass it