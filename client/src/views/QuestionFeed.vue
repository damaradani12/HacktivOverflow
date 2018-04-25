<template>
  <div class="container">
    <div v-for="(question, key) in questions" class="row" :key="key" id="QnA">
      <div class="col-md-1 col-xs-1 left-box">
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
      <div class="col-md-11 col-xs-10 text-left well" style="height: 100%;">
        <span style="font-size: 10px;">Posted by <strong>{{ question.owner.name }}</strong> {{ dateFormat(question.createdAt) }}</span>
        <pre>{{ question.title }}</pre>
        <router-link :to="{name: 'QnA', params: {id: question._id}}">{{ question.answer.length }} Answer</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'question',
  computed: mapState([
    'questions'
  ]),
  methods: {
    upvoteQuestions: function (questionId) {
      // console.log(questionId)
      this.$store.dispatch('upvoteQuestion', questionId)
    },
    downvoteQuestions: function (questionId) {
      // console.log(questionId)
      this.$store.dispatch('downvoteQuestion', questionId)
    },
    dateFormat: function (date) {
      let newDate = new Date(date)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      newDate = `${month} ${day}, ${year}`

      return newDate
    }
  }
}
</script>

<style scoped>
#QnA {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 15px 0px;
}

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

.Up {
  align-self: flex-start;
}

.Center {
  align-self: center;
}

.Down {
  align-self: flex-end;
}

.well {
  margin-bottom: 0px;
}
</style>
