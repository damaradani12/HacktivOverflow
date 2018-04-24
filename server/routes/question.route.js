const route = require('express').Router()
const {getAllQuestion, getOneQuestion, createQuestion, editQuestion, deleteQuestion, upvoteQuestion, downvoteQuestion} = require('../controllers/question.controller')
const {loginAuth} = require('../middleware/auth.js')

route.get('/', getAllQuestion)
    .get('/:id', getOneQuestion)
    .post('/create', loginAuth, createQuestion)
    .put('/edit/:id', loginAuth, editQuestion)
    .put('/upvote/:id', loginAuth, upvoteQuestion)
    .put('/downvote/:id', loginAuth, downvoteQuestion)
    .delete('/delete/:id', loginAuth, deleteQuestion)

module.exports = route