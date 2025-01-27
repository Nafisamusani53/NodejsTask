const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    body: { 
        type: String,
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    active: { 
        type: Boolean, 
        default: true 
    },
    geolocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);