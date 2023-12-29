// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Beru.Rent',
    component: () => import('@/pages/MainPage'),
  },  
  {
    path: '/register',
    name: 'регистрация',  
    component: () => import('@/pages/Registration'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
