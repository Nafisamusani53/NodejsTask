const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)