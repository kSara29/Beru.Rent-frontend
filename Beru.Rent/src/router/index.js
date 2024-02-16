// Composables
import { createRouter, createWebHistory } from 'vue-router'
import authService from '@/scripts/auth.service';


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
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/components/Callback.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/Chat/Chat.vue'),
  },
  {
    path: '/allChats',
    name: 'allChats',
    component: () => import('@/pages/Chat/AllChats.vue'),
  },
  {
    path: '/user/deals',
    name: 'сделки',
    component:() => import('@/pages/UserPages/DealPage.vue')
  },
  {
    path: '/silent-refresh',
    name: 'silent-refresh',
    component:()=> import('@/components/Silent-refresh.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: ()=> import('@/components/Logout.vue')
  },
  {
    path: '/deal-detail',
    name: 'deal-detail',
    component: ()=> import('@/pages/DealPages/DealDetail.vue')
  },
  {
    path: '/create-category',
    name: 'create-category',
    component: ()=> import('@/pages/AdPages/CreateCategory.vue')
  },
  {
    path: '/doc/:id',
    name: 'скачать договор1',
    component: () => import('@/pages/Doc.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})



router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    authService.getUser().then((user) => {
      if (!user) {
        // Redirect to login if not authenticated
        authService.login();
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router
