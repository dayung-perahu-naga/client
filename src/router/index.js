import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const playerName = localStorage.getItem('playerName')
    const isPlaying = localStorage.getItem('isPlaying')

    if (playerName && isPlaying) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
