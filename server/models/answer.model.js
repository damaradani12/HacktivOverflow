const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  answer: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'  
  },
  vote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'  
  }]
},{
  timestamps: true
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
