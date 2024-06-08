const mongoose = require('mongoose');
require('dotenv').config()

// function to establish connection with database
exports.dbConnect = async()=>{
    await mongoose.connect(process.env.DATABASE_URL,{})
    .then(console.log("DB connected"))
    .catch((error)=>{
        console.log("Issues in DB connection")
        console.error(error.message)
        process.exit(1);
    })
}