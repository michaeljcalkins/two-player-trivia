<template>
  <div>
    <router-link to="/" class="quit-button">
      <img src="/images/quit.png" />
    </router-link>
    <div class="upper-half align-center panel-container">
      <div class="panel-content text-center">
        <h2 v-if="selectedQuestion" v-html="selectedQuestion.question"></h2>
        <button
          v-bind:class="{ disabled: playerTwo.disabled }"
          v-on:click="checkAnswer(answer, 'Two')"
          v-for="answer in shuffledAnswers"
          v-html="answer"
        ></button>
      </div>
    </div>
    <div class="lower-half align-center panel-container">
      <div class="panel-content text-center">
        <h2 v-if="selectedQuestion" v-html="selectedQuestion.question"></h2>
        <button
          v-bind:class="{ disabled: playerOne.disabled }"
          v-on:click="checkAnswer(answer, 'One')"
          v-for="answer in shuffledAnswers"
          v-html="answer"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import clone from 'lodash/clone'
import shuffle from 'lodash/shuffle'
import sample from 'lodash/sample'
import axios from 'axios'

export default {
  data: function () {
    window.state.playerOne.correct = false
    window.state.playerOne.disabled = false
    window.state.playerTwo.correct = false
    window.state.playerTwo.disabled = false
    return {
      playerOne: clone(window.state.playerOne),
      playerTwo: clone(window.state.playerTwo),
      shuffledAnswers: [],
      selectedQuestion: null
    }
  },
  created: function () {
    var self = this
    var type = this.$route.query.type || 'General Knowledge'
    var categoryId = sample(window.state.categoryTypes[type])
    axios.get('https://opentdb.com/api.php?amount=1&category=' + categoryId + '&type=multiple')
      .then(function (response) {
        self.selectedQuestion = window.state.selectedQuestion = response.data.results[0]
        self.shuffledAnswers = shuffle(self.selectedQuestion.incorrect_answers.concat([self.selectedQuestion.correct_answer]))
        console.log(self.selectedQuestion.correct_answer)
      })
  },
  methods: {
    checkAnswer: function (answer, playerId) {
      var oppositePlayerId = playerId === 'One'
        ? 'One'
        : 'Two'

      if (this['player' + playerId].disabled) return

      if (this.selectedQuestion.correct_answer === answer) {
        this['player' + oppositePlayerId].disabled = true
        state['player' + playerId].correct = true
        state['player' + playerId].score++
        this.$router.push({
          path: 'WinnerScene',
          query: {
            type: this.$route.query.type
          }
        })
        this.$forceUpdate()
        return
      }

      this['player' + playerId].disabled = true

      this.$forceUpdate()

      if (this.playerOne.disabled && this.playerTwo.disabled) {
        this.$router.push({
          path: 'WinnerScene',
          query: {
            type: this.$route.query.type
          }
        })
      }
    }
  }
}
</script>
