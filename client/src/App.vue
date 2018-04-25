<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">Hacktiv Overflow</router-link>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <button v-if="isLogin" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#createQuestionModal">Create a Question</button>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#" v-if="!isLogin" data-toggle="modal" data-target="#loginModal">Login</a>
              <a href="#" v-else @click="logout">Logout</a>
            </li>
            <li><a href="#" v-if="!isLogin" data-toggle="modal" data-target="#signUpModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <login-modal />
    <sign-up-modal />
    <CreateQuestion />
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
import swal from 'sweetalert'

export default {
  name: 'app',
  components: {
    LoginModal,
    SignUpModal,
    CreateQuestion
  },
  methods: {
    logout: function () {
      swal({
        title: 'Are you sure?',
        icon: 'warning',
        buttons: [true, 'Yes, Log out!']
      }).then(result => {
        if (result) {
          localStorage.removeItem('token')
          this.$store.commit('userLogin', false)
          swal(
            'Log out!',
            'You have been log out.',
            'success'
          ).then(result => {
            this.$router.push('/')
          })
        }
      })
    }
  },
  computed: mapState([
    'isLogin'
  ]),
  created: function () {
    let token = localStorage.getItem('token')
    this.$store.dispatch('tokenCheck', token)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  border-color: darkgrey;
}

body {
  background-color: rgba(255, 250, 240, 0.678);
}
</style>
