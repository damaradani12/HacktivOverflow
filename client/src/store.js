import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: 'http://ec2-18-222-33-44.us-east-2.compute.amazonaws.com/',
    // server: 'http://localhost:3000/',
    questions: [],
    isLogin: false,
    uid: '',
    role: '',
    question: {}
  },
  mutations: {
    setQuestion: function (state, payload) {
      state.questions = payload
    },
    userLogin: function (state, payload) {
      state.isLogin = payload
    },
    setUid: function (state, payload) {
      state.uid = payload
    },
    setRole: function (state, payload) {
      state.role = payload
    },
    specificQuestion: function (state, payload) {
      state.question = payload
    }
  },
  actions: {
    // Questions
    getQuestion: function ({ commit }) {
      let url = this.state.server + 'question/'
      axios.get(url)
        .then(questions => {
          // console.log(JSON.stringify(questions.data.data, null, 2))
          commit('setQuestion', questions.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestionById: function ({ commit }, questionId) {
      let url = this.state.server + 'question/' + questionId
      axios.get(url)
        .then(response => {
          commit('specificQuestion', response.data.question)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuestion: function ({dispatch, commit}, question) {
      let url = this.state.server + 'question/create'
      let token = localStorage.getItem('token')

      axios.post(url, question, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          swal(
            'New Question!',
            'Question Succesfully Created',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    editQuestion: function ({dispatch, commit}, question) {
      let url = this.state.server + 'question/edit/' + question._id
      let token = localStorage.getItem('token')
      // console.log('Dari Store', question)
      axios.put(url, question, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          dispatch('getQuestionById', question._id)
          swal(
            'Question!',
            'Question Succesfully Edited',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    deleteQuestion: function ({dispatch, commit}, questionId) {
      let url = this.state.server + 'question/delete/' + questionId
      let token = localStorage.getItem('token')

      axios.delete(url, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          swal(
            'Question!',
            'Question Succesfully Deleted',
            'success'
          ).then(() => {
            router.push('/')
          })
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    upvoteQuestion: function ({dispatch, commit}, questionId) {
      let url = this.state.server + 'question/upvote/' + questionId
      let token = localStorage.getItem('token')
      // console.log('Upvote in store', questionId)
      axios.put(url, {}, {headers: {token}})
        .then(response => {
          // console.log(response)
          dispatch('getQuestion')
          dispatch('getQuestionById', questionId)
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    downvoteQuestion: function ({dispatch, commit}, questionId) {
      let url = this.state.server + 'question/downvote/' + questionId
      let token = localStorage.getItem('token')

      axios.put(url, {}, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          dispatch('getQuestionById', questionId)
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    // Answer
    addAnswer: function ({dispatch, commit}, question) {
      let url = this.state.server + 'answer/create'
      let token = localStorage.getItem('token')

      axios.post(url, question, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          dispatch('getQuestionById', question.id)
          swal(
            'New Answer!',
            'Answer Succesfully Created',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    deleteAnswer: function ({dispatch, commit}, {answerId, questionId}) {
      let url = this.state.server + 'answer/delete/' + answerId
      let token = localStorage.getItem('token')

      axios.delete(url, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          dispatch('getQuestionById', questionId)
          swal(
            'New Answer!',
            'Answer Succesfully Created',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    upvoteAnswer: function ({dispatch, commit}, {answerId, questionId}) {
      let url = this.state.server + 'answer/upvote/' + answerId
      let token = localStorage.getItem('token')
      console.log(questionId)
      axios.put(url, {}, {headers: {token}})
        .then(response => {
          // console.log('Upvote answer', response)
          dispatch('getQuestion')
          dispatch('getQuestionById', questionId)
        }) // console.log(JSON.stringify(questions.data.data, null, 2))
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    downvoteAnswer: function ({dispatch, commit}, {answerId, questionId}) {
      let url = this.state.server + 'answer/downvote/' + answerId
      let token = localStorage.getItem('token')

      axios.put(url, {}, {headers: {token}})
        .then(response => {
          dispatch('getQuestion')
          dispatch('getQuestionById', questionId)
        })
        .catch(err => {
          console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'U Need to Login'
          })
        })
    },
    // Other
    tokenCheck: function ({commit}, token) {
      if (token) {
        let url = this.state.server + 'user/checktoken'
        axios.get(url, {headers: {token}})
          .then(response => {
            // console.log('Token ====> ', response.data.user)
            commit('userLogin', response.data.states)
            commit('setRole', response.data.user.role)
            commit('setUid', response.data.user._id)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('No Token, need to Login')
      }
    }
  }
})
