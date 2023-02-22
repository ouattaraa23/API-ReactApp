require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('connected', () => console.log('Connected to Database!'))

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(28017, () => console.log('Server has been Started!'))