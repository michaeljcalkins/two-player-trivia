<template>
  <div class="align-center text-center main-menu-container">
    <div class="container" style="width: 100%">
      <div class="categories-container">
        <button v-on:click="selectQuestionCategory('General Knowledge')">General Knowledge</button>
        <button v-on:click="selectQuestionCategory('Science')">Science</button>
        <button v-on:click="selectQuestionCategory('Geography')">Geography</button>
        <button v-on:click="selectQuestionCategory('Animals')">Animals</button>
        <button v-on:click="selectQuestionCategory('Entertainment')">Entertainment</button>
        <button v-on:click="selectQuestionCategory('History')">History</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {
    window.state.playerOne.score = 0
    window.state.playerTwo.score = 0
    window.state.selectedQuestion = {}
  },
  template: '#MainMenuScene',
  methods: {
    selectQuestionCategory: function (type) {
      this.$router.push({
        path: 'ShowQuestionScene',
        query: {
          type: type
        }
      })
    }
  }
}
</script>
