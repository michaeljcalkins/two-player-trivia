<template>
  <div>
    <div v-on:click="goToMainMenu()" class="quit-button">
      <img src="/images/quit.png" />
    </div>
    <div class="upper-half align-center panel-container">
      <div class="align-center panel-content">
        <div v-if="!roundIsOver && playerTwo.correct">
          <img src="/images/correct.png" />
          <br />
          <h1>Answer: <span v-html="selectedQuestion.correct_answer"></span></h1>
          <h1>Your Score: {{playerTwo.score}}/6</h1>
          <h1>Their Score: {{playerOne.score}}/6</h1>
        </div>
        <div v-if="!roundIsOver && !playerTwo.correct">
          <img src="/images/incorrect.png" />
          <br />
          <h1>Answer: <span v-html="selectedQuestion.correct_answer"></span></h1>
          <h1>Your Score: {{playerTwo.score}}/6</h1>
          <h1>Their Score: {{playerOne.score}}/6</h1>
        </div>
        <div v-if="playerOneWon">
          <img src="/images/you-lost.png" />
        </div>
        <div v-if="playerTwoWon">
          <img src="/images/you-win.png" />
        </div>
      </div>
    </div>
    <div class="lower-half align-center panel-container">
      <div class="align-center panel-content">
        <div v-if="!roundIsOver && playerOne.correct">
          <img src="/images/correct.png" />
          <br />
          <h1>Answer: <span v-html="selectedQuestion.correct_answer"></span></h1>
          <h1>Your Score: {{playerOne.score}}/6</h1>
          <h1>Their Score: {{playerTwo.score}}/6</h1>
        </div>
        <div v-if="!roundIsOver && !playerOne.correct">
          <img src="/images/incorrect.png" />
          <br />
          <h1>Answer: <span v-html="selectedQuestion.correct_answer"></span></h1>
          <h1>Your Score: {{playerOne.score}}/6</h1>
          <h1>Their Score: {{playerTwo.score}}/6</h1>
        </div>
        <div v-if="playerTwoWon">
          <img src="/images/you-lost.png" />
        </div>
        <div v-if="playerOneWon">
          <img src="/images/you-win.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clone from 'lodash/clone'

export default {
  data: function () {
    return {
      timeoutHandle: null,
      selectedQuestion: clone(window.state.selectedQuestion),
      playerOne: clone(window.state.playerOne),
      playerTwo: clone(window.state.playerTwo)
    }
  },
  created: function () {
    var self = this
    this.timeoutHandle = setTimeout(function() {
      if (window.state.playerOne.score >= 6 || window.state.playerTwo.score >= 6) {
        window.state.playerOne = {
          score: 0,
          correct: false
        }
        window.state.playerTwo = {
          score: 0,
          correct: false
        }
        window.state.selectedQuestion = {}
        self.$router.push('/')
        return
      }

      self.$router.push({
        path: 'ShowQuestionScene',
        query: {
          type: self.$route.query.type
        }
      })
    }, 3000)
  },
  computed: {
    playerOneWon: function () {
      return window.state.playerOne.score >= 6
    },
    playerTwoWon: function () {
      return window.state.playerTwo.score >= 6
    },
    roundIsOver: function () {
      return window.state.playerTwo.score >= 6 || window.state.playerOne.score >= 6
    }
  },
  methods: {
    goToMainMenu: function () {
      window.clearTimeout(this.timeoutHandle)
      this.$router.push('/')
    }
  }
}
</script>
