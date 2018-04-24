const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  title: String,
  details: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'  
  }],
  vote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'  
  }]
},{
  timestamps: true
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
