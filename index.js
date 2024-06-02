// MAIN SERVER FILE
require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const DBConnect = require('./config/DBConnect')
const cors = require('cors');

const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false}));    // built in middleware for handling form data
app.use(express.json());    // build in middleware for json

// Connect to MongoDB
DBConnect();

app.use(cors());

// middleware for css and images(static files)
app.use(express.static(path.join(__dirname, 'public')))

// Basic routes for pages
app.use('/', require('./routes/root.js'))

// crud apis for proffessor model
app.use('/professor', require('./routes/api/professors'))


mongoose.connection.once('open', ()=>{
    console.log("mongoDB connected");
    app.listen(PORT, ()=>{
        console.log("server running on Port", PORT);
    })

})