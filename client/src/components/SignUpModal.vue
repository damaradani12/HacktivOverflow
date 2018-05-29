<template>
  <div class="modal fade" id="signUpModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="signup()">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Sign Up</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label for="SUname">Name :</label><small id="SUnameCek"></small>
          <input type="text" v-model="name" class="form-control" id="SUname">

          <label for="SUemail">Email :</label><small id="SUemailCek"></small>
          <input type="text" v-model="email" class="form-control" id="SUemail">

          <label for="SUpassword">Password :</label><small id="SUpasswordCek"></small>
          <input type="password" v-model="password" class="form-control" id="SUpassword">

          <label for="SUconPass">Confirm Password :</label><small id="SUconPassCek"></small>
          <input type="password" v-model="conPass" class="form-control" id="SUconPass">
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default" >Sign Up</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'SignUpModal',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      conPass: ''
    }
  },
  methods: {
    signup: function () {
      let cek = this.cekForm()
      let url = this.$store.state.server + 'user/signup'

      if (cek) {
        let newUser = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        axios.post(url, newUser)
          .then(response => {
            swal(
              'Sign Up!',
              'You sign up successfully!',
              'success'
            ).then(result => {
              this.name = ''
              this.email = ''
              this.password = ''
              this.conPass = ''
              // eslint-disable-next-line
              $('#signUpModal').modal('toggle')
            })
          })
          .catch(error => {
            console.log(error)
            swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Email is not available!'
            })
          })
      }
    },
    cekForm: function () {
      // eslint-disable-next-line
      let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let checkEmail = regEx.test(String(this.email).toLowerCase())
      let cekPwd = this.password.match(/[0-9]/g)
      if (this.name === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Name must be filled'
        })
        return false
      } else if (this.email === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Email must be filled'
        })
        return false
      } else if (!checkEmail) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Email format is Wrong'
        })
        return false
      } else if (this.password === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Password must be filled'
        })
        return false
      } else if (this.password.length < 5) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Password minimal 5 digits'
        })
        return false
      } else if (!cekPwd) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Password must contained Number'
        })
        return false
      } else if (this.conPass === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Confirm Password must be filled'
        })
        return false
      } else if (this.password !== this.conPass) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Password not match'
        })
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>

</style>
