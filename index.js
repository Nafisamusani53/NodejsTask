const express = require('express')
require('dotenv').config()
const {dbConnect} = require('./config/database')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
require('./config/passport');

const app = express();

// connect with databases
dbConnect();

// middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// default route
app.get('/', (req,res) => {
    res.json({
        success: true,
        message : "Your server is running....."
    })
})


// start the app
const port = process.env.PORT || 4000
app.listen(port , ()=>{
    console.log("App started")
})