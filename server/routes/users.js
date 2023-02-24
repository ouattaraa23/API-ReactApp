const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        // 500 status means there's something wrong in the server
        res.status(500).json( {message: err.message })
    }
})

module.exports = router