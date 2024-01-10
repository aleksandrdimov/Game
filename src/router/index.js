import { createRouter, createWebHistory } from 'vue-router'
import Board from '../modules/board/Board.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Board
    },
  ]
})

export default router
