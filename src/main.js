import Vue from 'vue'
import VueRouter from 'vue-router'

import MainMenuScene from './MainMenuScene.vue'
import ShowQuestionScene from './ShowQuestionScene.vue'
import WinnerScene from './WinnerScene.vue'

function preload () {
  let images = arguments
  for (let i = 0; i < images.length; i++) {
    let newImage = new Image()
    newImage.src = 'images/' + images[i]
  }
}

preload(
  'bg.png',
  'button.png',
  'categories-panel.png',
  'correct.png',
  'incorrect.png',
  'panel.png',
  'quit.png',
  'you-lost.png',
  'you-win.png'
)

window.state = {
  playerOne: {
    score: 0
  },
  playerTwo: {
    score: 0
  },
  selectedQuestion: {},
  categoryTypes: {
    'General Knowledge': [9],
    'Science': [17, 18, 19, 30],
    'Geography': [22],
    'Animals': [27],
    'Entertainment': [10, 11, 12, 13, 14, 15, 16, 29, 31, 32],
    'History': [23]
  }
}

Vue.use(VueRouter)

const routes = [
  { path: '/', component: MainMenuScene },
  { path: '/ShowQuestionScene', component: ShowQuestionScene },
  { path: '/WinnerScene', component: WinnerScene }
]

const router = new VueRouter({
  routes: routes
})

new Vue({
  router
}).$mount('#app')
