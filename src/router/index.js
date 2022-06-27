import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Movie/:id',
    name: 'Movie',
    component: Movie
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
