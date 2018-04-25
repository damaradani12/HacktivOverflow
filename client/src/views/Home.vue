<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <QuestionFeed />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionFeed from '@/views/QuestionFeed.vue'

export default {
  name: 'home',
  components: {
    QuestionFeed
  },
  created: function () {
    this.$store.dispatch('getQuestion')
  }
}
</script>
