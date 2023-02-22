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

// Creating a User
router.post('/', async (req, res) => {
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
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
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }

    if(req.body.email != null) {
        res.user.email = req.body.email
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting a User
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: "Deleted User"})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getUser(req, res, next) {
let user

    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            // Could not find user
            return res.status(404).json({ message: 'Cannot find User'})
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

module.exports = router