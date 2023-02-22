const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    current_club: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', playerSchema)