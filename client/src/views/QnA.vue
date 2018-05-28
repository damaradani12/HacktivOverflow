<template>
    <div class="container" v-if="question">
      <div class="row" id="QnA">
        <div class="col-md-1 col-xs-1 left-box" style="height: 100%;">
          <table>
            <tr>
              <td>
                <a @click="upvoteQuestions(question._id)" class="Up"><span class="glyphicon glyphicon-circle-arrow-up"></span></a>
              </td>
            </tr>
            <tr>
              <td>
                <h4 class="Center">{{ question.vote.length }}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <a @click="downvoteQuestions(question._id)" class="Down"><span class="glyphicon glyphicon-circle-arrow-down"></span></a>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-md-11 col-xs-10 text-left well well-sm" style="height: 100%;">
          <span style="font-size: 10px;">Posted by <strong>{{ question.owner.name }}</strong> {{ dateFormat(question.createdAt) }}</span>
          <h4>{{ question.title }}</h4>
          <p>{{ question.details }}</p>
          <span>{{ question.answer.length }} Answer
            <a v-if="question.owner._id === uid" data-toggle="modal" data-target="#editQuestionModal" >Edit</a>
            <a v-if="question.owner._id === uid" @click="deleteQuestion(question._id)"> Delete</a>
          </span>
          <hr>
          <h3>Write Answer</h3>
          <textarea rows="5" v-model="answer" class="form-control" style="resize: none;"></textarea>
          <div class="text-right" style="margin-top: 5px;"><button class="btn btn-default" @click="createAnswer">Add</button></div>
          <hr>
          <!-- Looping Answer -->
          <div class="row" v-for="(answer, key) in question.answer" :key="key" style="margin-bottom: 5px;">
            <div class="col-md-1 col-xs-2">
              <table>
                <tr><td>
                    <a @click="upvoteAnswer(answer._id)" class="Up"><span class="glyphicon glyphicon-circle-arrow-up"></span></a>
                </td></tr>
                <tr><td>
                    <h4 v-if="answer.vote.length >= 0" class="text-center">{{ answer.vote.length }}</h4>
                </td></tr>
                <tr><td>
                    <a @click="downvoteAnswer(answer._id)" class="Down"><span class="glyphicon glyphicon-circle-arrow-down"></span></a>
                </td></tr>
              </table>
            </div>
            <div class="col-md-10 col-xs-9 text-left well well-sm" style="height: 100%;">
              <span style="font-size: 10px;">Posted by <strong>{{ answer.owner.name }}</strong> {{ dateFormat(answer.createdAt) }}</span>
              <h4>{{ answer.answer }}</h4>
              <span v-if="answer.owner._id === uid"><a @click="deleteAnswer(answer._id)">Delete</a></span>
            </div>
          </div>
        </div>
      </div>
      <edit-question :question="question" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import axios from 'axios'
import swal from 'sweetalert'
import EditQuestion from '@/components/EditQuestion.vue'

export default {
  name: 'QnA',
  components: {
    EditQuestion
  },
  props: ['id'],
  data () {
    return {
      QnAs: {},
      answer: ''
    }
  },
  methods: {
    upvoteQuestions: function (questionId) {
      // console.log(questionId)
      this.$store.dispatch('upvoteQuestion', questionId)
      this.getQuestion()
    },
    downvoteQuestions: function (questionId) {
      // console.log(questionId)
      this.$store.dispatch('downvoteQuestion', questionId)
      this.getQuestion()
    },
    upvoteAnswer: function (answerId) {
      // console.log(answerId)
      this.$store.dispatch('upvoteAnswer', {answerId, questionId: this.id})
      // this.getQuestion()
    },
    downvoteAnswer: function (answerId) {
      // console.log(answerId)
      this.$store.dispatch('downvoteAnswer', {answerId, questionId: this.id})
      // this.getQuestion()
    },
    dateFormat: function (date) {
      let newDate = new Date(date)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      newDate = `${month} ${day}, ${year}`

      return newDate
    },
    getQuestion: function () {
      // let token = localStorage.getItem('token')
      // let url = this.$store.state.server + `question/${this.id}`
      // this.$store.dispatch('tokenCheck', token)
      this.$store.dispatch('getQuestionById', this.id)
      // return this.questions.filter(question => question._id === this.id)[0]
      // console.log('In Created', this.id)
      // axios.get(url)
      //   .then(response => {
      //     console.log(response.data.question)
      //     this.QnAs = response.data.question
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    createAnswer: function () {
      let question = {
        answer: this.answer,
        id: this.id
      }
      // console.log(question)
      this.$store.dispatch('addAnswer', question)
      this.answer = ''
    },
    deleteQuestion: function (questionId) {
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete this Question`,
        icon: 'warning',
        buttons: [true, 'Yes Delete it']
      }).then(result => {
        if (result) {
          // console.log('Question Id', questionId)
          this.$store.dispatch('deleteQuestion', questionId)
        }
      })
    },
    deleteAnswer: function (answerId) {
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete this Answer`,
        icon: 'warning',
        buttons: [true, 'Yes Delete it']
      }).then(result => {
        if (result) {
          // console.log('Question Id', answerId)
          this.$store.dispatch('deleteAnswer', {answerId, questionId: this.id})
        }
      })
    }
  }, // Looping Terus kalo pake
  // updated: function () {
  //   this.getQuestion()
  // },
  computed: mapState([
    'question',
    'uid'
  ]),
  created: function () {
    this.getQuestion()
  }
}
</script>

<style>
.left-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

a:hover {
  cursor: pointer;
}

.left-box a {
  font-size: 26px;
}
</style>
