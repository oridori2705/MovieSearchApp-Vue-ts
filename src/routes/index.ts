import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './MainPage.vue'
import MovieModalVue from './MovieModal.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/:movie',
      component: MainPage,
      children: [
        {
          path: ':id',
          component: MovieModalVue
        }
      ]
    }
  ]
})
