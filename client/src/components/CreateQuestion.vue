<template>
  <div class="modal fade" id="createQuestionModal" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Create a Question</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label>Title :</label>
          <input type="text" class="form-control" v-model="title">
          <label>Details :</label>
          <textarea class="form-control" v-model="details" rows="3" style="resize: none;"></textarea>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default" data-dismiss="modal" @click="createQuestion">Create</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
// import axios from 'axios'

export default {
  name: 'CreateQuestion',
  data () {
    return {
      title: '',
      details: ''
    }
  },
  methods: {
    createQuestion: function () {
      let question = {
        title: this.title,
        details: this.details
      }
      this.$store.dispatch('addQuestion', question)
      this.title = ''
      this.details = ''
      // eslint-disable-next-line
      $('#createQuestionModal').modal('toggle')
    },
    cekForm: function () {
      if (this.title === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Title must be filled'
        })
        return false
      } else if (this.details === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Details must be filled'
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
