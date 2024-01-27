import { createRouter, createWebHistory } from 'vue-router'
import Board from '../modules/board/Board.vue'
import AdminPanel from '../modules/adminPanel/AdminPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/',
      name: 'home',
      component: AdminPanel
    },
  ]
})

export default router
