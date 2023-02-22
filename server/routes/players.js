const express = require('express')
const router = express.Router()
const Player = require('../models/player')

// Getting all Users
router.get('/', async (req, res) => {
    try {
        const players = await Player.find()
        res.json(players)
    } catch (err) {
        // 500 status means there's something wrong in the server
        res.status(500).json( {message: err.message })
    }
})

// Getting a User
router.get('/:id', getPlayer,(req, res) => {
    res.json(res.player)
})

// Creating a User
router.post('/', async (req, res) => {
    const player = new Player ({
        full_name: req.body.full_name,
        age: req.body.age,
        position: req.body.position,
        current_club: req.body.current_club,
        nationality: req.body.nationality
    })

    try {
        const newPlayer = await player.save()
        // Makes sure you create a database
        res.status(201).json(newPlayer)
    } catch (err) {
        // User gave bad data
        res.status(400).json({message: err.message})
    }
})

// Updates only the information passed, and not all(put)
router.patch('/:id', getPlayer, async (req, res) => {
    if (req.body.full_name != null) {
        res.player.full_name = req.body.full_name
    }

    if(req.body.age != null) {
        res.player.age = req.body.age
    }

    if(req.body.position != null) {
        res.player.position = req.body.position
    }

    if(req.body.current_club != null) {
        res.player.current_club = req.body.current_club
    }

    if(req.body.nationality != null) {
        res.player.nationality = req.body.nationality
    }

    try {
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting a User
router.delete('/:id', getPlayer, async (req, res) => {
    try {
        await res.player.remove()
        res.json({message: "Deleted Player"})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getPlayer(req, res, next) {
let player

    try {
        player = await Player.findById(req.params.id)
        if (player == null) {
            // Could not find user
            return res.status(404).json({ message: 'Cannot find Player'})
        }
    } catch (err) {
        if (player == null) {
            return res.status(404).json({ message: "Cannot find User" })
        }
        return res.status(500).json({message: err.message})
    }

    res.player = player
    next()
}

module.exports = router