const jwt = require('jsonwebtoken')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')
const pwdtoken = process.env.pwdtoken

module.exports = {
  getAllQuestion: function (req, res) {
    Question.find()
      .populate('owner')
      .populate({
        path: 'answer',
        populate: {
          path: 'owner',
          model: 'User'
        }
      })
      .exec()
      .then(question => {
        res.status(200).json({
          message: "Show All Question",
          data: question
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "error",
          err
        })
      })
  },
  getOneQuestion: function (req, res) {
    let questionId = req.params.id
    Question.findOne({_id: questionId})
      .populate('owner')
      .populate('answer')
      .exec()
      .then(question => {
        res.status(200).json({
          message: "Show Spesific Question",
          question
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "error",
          err
        })
      })
  },
  createQuestion: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id    

    let newQuestion = new Question ({
      title: req.body.title,
      details: req.body.details,
      owner: userId
    })

    newQuestion.save((err, question) => {
      if (err) {
        res.status(500).json({
          message: "error",
          err
        })
      }else{
        res.status(200).json({
          message: "New Question has been created",
          question
        })
      }
    })
  },
  editQuestion: function (req, res) {
    let questionId = req.params.id
    let title = req.body.title
    let details = req.body.details

    Question.update(
      {_id: questionId},
      {$set: {title, details}}
    ).then(result => {
      res.status(200).json({
        message: "Edit Question Succes",
        result
      })
    }).catch(err => {
      res.status(500).json({
        message: "Error",
        err
      })
    })
  },
  deleteQuestion: function (req, res) {
    if (req.params.id) {
      let questionId = req.params.id
      Question.remove({_id: questionId})
        .then(result => {
          deleteAnswer(req, res, questionId)
        })
        .catch(err => {
          res.status(500).json({
            message: "error",
            err
          })
        })
    } else {
      res.status(406).json({
        message: "Question Id is undefined"
      })
    }
  },
  upvoteQuestion: function (req, res) {
    let questionId = req.params.id
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id

    Question.update(
      {_id: questionId},
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
  downvoteQuestion: function (req, res) {
    let questionId = req.params.id
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id
    Question.update(
      {_id: questionId},
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

// Delete Answer in Question
function deleteAnswer (req, res, questionId) {
  Answer.remove({question: questionId})
    .then(result => {
      console.log('Apa Kesnin', result)
      res.status(200).json({
        message: "Delete Question and the Answer Success",
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "error",
        err
      })
    })
}