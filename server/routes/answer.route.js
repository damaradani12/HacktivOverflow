const route = require('express').Router()
const {getAllAnswer, createAnswer, deleteAnswer, upvoteAnswer, downvoteAnswer} = require('../controllers/answer.controller')
const {loginAuth} = require('../middleware/auth.js')

route.get('/', getAllAnswer)
    .post('/create', loginAuth, createAnswer)
    .put('/upvote/:id', loginAuth, upvoteAnswer)
    .put('/downvote/:id', loginAuth, downvoteAnswer)
    .delete('/delete/:id', loginAuth, deleteAnswer)

module.exports = route