import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
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
      component: () => import('../views/OnBoarding.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoard.vue'),
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('../views/ChalLenge.vue'),
    },
  ],
})

export default router
