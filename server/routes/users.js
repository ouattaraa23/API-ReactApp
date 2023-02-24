const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting all Users
router.get('/users/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        // 500 status means there's something wrong in the server
        res.status(500).json( {message: err.message })
    }
})

// Getting a User By Username
router.get('/user/:username', getUsername, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        // 500 status means there's something wrong in the server
        res.status(500).json( {message: err.message })
    }
})

// Creating a User
router.post('/register', async (req, res) => {
    const user = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
})

async function getUsername(req, res, next) {
    let user

    try {
        user = await User.findOne({ username: req.params.username})
    } catch (err) {
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find User'})
        }
        return res.status(500).json({ message: err.message})
    }

    res.user = user
    next()
}

module.exports = router