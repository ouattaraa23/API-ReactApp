require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')


app.use(cors({
    credentials: true,
    origin: '*'
}))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('connected', () => console.log('Connected to Database!'))

app.use(express.json())


let cookie;

const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    PORT = 28017,

    SESS_NAME = 'sid',
    SESS_SECRET = 'extra-extra-secret',
    SESS_LIFTIME = TWO_HOURS
} = process.env

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        httpOnly: true,
        maxAge: SESS_LIFTIME,
        sameSite: true,
        secure: true,
    }
}))

const playerRouter = require('./routes/players')
app.use('/players', playerRouter)

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.post('/login/', async (req, res) => {
    const {username, password } = req.body;

    try {

        const user = await validation(username, password);

        if (user) {
            req.session.userId = user._id;
            cookie = req.session.userId;
            res.redirect('/');
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    } catch (err) {
        console.log(err.message);
        res.status(500);
    }
});

const authenticated = (req, res, next) => {
    if (!cookie) {
        res.redirect('/login/');
    } else {
        next();
    }
}

app.get('/auth/', authenticated, (req, res) => {
    console.log(req.session.userId)
    res.status(200);
})

app.post('/logout/', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    cookie = null;
    res.status(200);
})

function validation(name, pass) {
    try {
        const database = db.db;
        const users = database.collection('users');
        const user = users.findOne({ username: name, password: pass});

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch(err) {
        res.status(401);
        return null;
    }
};

app.listen(28017, () => console.log('Server has been Started!'))