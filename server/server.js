require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
//const session = require('express-session')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('connected', () => console.log('Connected to Database!'))

app.use(express.json())

app.use(cors({
    origin: '*'
}))

// const TWO_HOURS = 1000 * 60 * 60 * 2

// const {
//     PORT = 28017,

//     SESS_NAME = 'sid',
//     SESS_SECRET = 'ssh!quiet,it\'sasecret',
//     SESS_LIFTIME = TWO_HOURS
// } = process.env

// app.use(session({
//     name: SESS_NAME,
//     resave: false,
//     saveUninitialized: false,
//     secret: SESS_SECRET,
//     cookie: {
//         maxAge: SESS_LIFTIME,
//         sameSite: true,
//         secure: true,
//     }
// }))

const playerRouter = require('./routes/players')
app.use('/players', playerRouter)

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(28017, () => console.log('Server has been Started!'))