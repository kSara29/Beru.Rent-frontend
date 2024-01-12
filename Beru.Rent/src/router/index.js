// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'главная страница',
    component: () => import('@/pages/Default/MainPage.vue'),
  },
  {
    path: '/register',
    name: 'регистрация',
    component: () => import('@/pages/UserPages/Registration.vue'),
  },
  {
    path: '/profile',
    name: 'личный кабинет',
    component: () => import('@/pages/UserPages/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
