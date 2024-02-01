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
  },
  {
    path: '/details/:id',
    name: 'DetailPage',
    component: () => import('@/pages/Default/AdDetails.vue'),
  }
  ,
  {
    path: '/createad',
    name: 'создать объявление',
    component: () => import('@/pages/AdPages/CreateAd.vue'),
  },
  {
    path: '/profile/notifications/:id',
    name: 'уведомления',
    component: () => import('@/pages/UserPages/Notifications.vue')
  }
  ,
  {
    path: '/test',
    name: 'test',
    component: () => import('@/pages/Chat/Chat.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
