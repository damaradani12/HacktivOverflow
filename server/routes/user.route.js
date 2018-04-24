const route = require('express').Router()
const {signIn, signUp, profile, tokenCheck} = require('../controllers/user.controller')

route.get('/checktoken', tokenCheck)
    .get('/profile', profile) // belum keppake
    .post('/signin', signIn)
    .post('/signup', signUp)

module.exports = route