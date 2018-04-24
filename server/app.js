const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

require('dotenv').config()
let dbuname = process.env.dbuname
let dbpwd = process.env.dbpwd

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

// mlab connection
mongoose.connect(`mongodb://${dbuname}:${dbpwd}@ds053894.mlab.com:53894/hacktiv_overflow`)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Connected to mongoose')
})

app.get('/', function (req, res) {
    res.send('Welcome to Hacktiv Overflow Server')
})

let user = require('./routes/user.route')
app.use('/user', user)

let question = require('./routes/question.route')
app.use('/question', question)

let answer = require('./routes/answer.route')
app.use('/answer', answer)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})