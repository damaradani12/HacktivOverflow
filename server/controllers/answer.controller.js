const jwt = require('jsonwebtoken')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')
const pwdtoken = process.env.pwdtoken

module.exports = {
  getAllAnswer: function (req, res) {
    Answer.find()
      .populate('owner')  
      .exec()
      .then(answer => {
        res.status(200).json({
          message: "show all answer",
          answer
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "error",
          err
        })
      })      
  },
  createAnswer: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id    
    let questionId = req.body.id

    let newAnswer = new Answer ({
      answer: req.body.answer,
      owner: userId,
      question: questionId
    })

    newAnswer.save((err, answer) => {
      if (err) {
        res.status(500).json({
          message: "error",
          err
        })
      } else {
        insertAnswerInQuestion(req, res, questionId, answer)
      }
    })
  },
  deleteAnswer: function (req, res) {
    let questionId = req.body.questionId
    // ato pake headers kalo body ga bisa
    let answerId = req.params.id
    Answer.remove({_id: answerId})
      .then(result => {
        deleteAnswerInQuestion(req, res, questionId, answerId)
      })
      .catch(err => {
        res.status(500).json({
          message: "error",
          err
        })
      })
  },
  upvoteAnswer: function (req, res) {
    let answerId = req.params.id
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id

    Answer.update(
      {_id: answerId},
      {$addToSet: {vote: userId}}
    ).then(result => {
      res.status(201).json({
        message: "Upvote Success",
        result
      })
    }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
  },
  downvoteAnswer: function (req, res) {
    let answerId = req.params.id
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id

    Answer.update(
      {_id: answerId},
      {$pull: {vote: userId}}
    ).then(result => {
      res.status(201).json({
        message: "Downvote Success",
        result
      })
    }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
}

// inser answer into question
function insertAnswerInQuestion (req, res, questionId, answer) {
  Question.update(
    {_id: questionId},
    {$push: {answer: answer._id}}
  ).then(question => {
    res.status(201).json({
      message: "Answer successfully created",
      question,
      answer
    })
  }).catch(err => {
    res.status(500).json({
      message: err
    })
  })
}

// remove answer from question
function deleteAnswerInQuestion (req, res, questionId, answerId) {
  Question.update(
    {_id: questionId},
    {$push: {answer: answerId}}
  ).then(question => {
    res.status(201).json({
      message: "Answer successfully deleted",
      question,
      answerId
    })
  }).catch(err => {
    res.status(500).json({
      message: err
    })
  })
}