import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateAccount.vue'),
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../views/ForgotPassword.vue'),
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('../views/Onboarding.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('../views/Challenge.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/Archive.vue'),
    },
    {
      path: '/points',
      name: 'points',
      component: () => import('../views/Points.vue'),
    },


  ],
})

export default router
