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

// Getting a User
router.get('/:id', getUser,(req, res) => {
    res.json(res.user)
})

// Getting a UserByName
router.get('/name/:password', getUserByPass,(req, res) => {
    res.json(res.user)
})

// Creating a User
router.post('/', async (req, res) => {
    const user = new User ({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
        // Makes sure you create a database
        res.status(201).json(newUser)
    } catch (err) {
        // User gave bad data
        res.status(400).json({message: err.message})
    }
})

// Updates only the information passed, and not all(put)
router.patch('/:password', getUser, async (req, res) => {
    if (req.body.password != null) {
        res.player.password = req.body.password
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedPlayer)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

async function getUser(req, res, next) {
let user

    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            // Could not find user
            return res.status(404).json({ message: 'Cannot find Player'})
        }
    } catch (err) {
        if (user == null) {
            return res.status(404).json({ message: "Cannot find User" })
        }
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

async function getUserByPass(req, res, next) {
    let user

    try {
        user = await User.findOne({ password: req.params.password})
    } catch (err) {
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find Player'})
        }
        return res.status(500).json({ message: err.message})
    }

    res.user = user
    next()
}

module.exports = router