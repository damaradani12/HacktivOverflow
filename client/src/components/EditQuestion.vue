<template>
  <div class="modal fade" id="editQuestionModal" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Edit a Question</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label>Title :</label>
          <input type="text" class="form-control" v-model="title">
          <label>Details :</label>
          <textarea class="form-control" v-model="details" rows="3" style="resize: none;"></textarea>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-default" data-dismiss="modal" @click="editQuestion">Edit</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditQuestion',
  props: ['question'],
  data () {
    return {
      title: '',
      details: ''
    }
  },
  methods: {
    editQuestion: function () {
      // console.log('Edit Question', this.title)
      // console.log(this.details)
      let setQuestion = {
        _id: this.question._id,
        title: this.title,
        details: this.details
      }
      this.$store.dispatch('editQuestion', setQuestion)
    }
  },
  mounted: function () {
    this.title = this.question.title
    this.details = this.question.details
    // console.log('Edit Question', this.question)
  }
}
</script>

<style>

</style>
