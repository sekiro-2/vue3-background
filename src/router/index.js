import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
// 头部切换路由进度条
import 'nprogress/nprogress.css' // 引入样式
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home/index.vue'),
      redirect: '/home/dashboard', // 访问 /home 时自动跳转 dashboard,重定向
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/Home/index.vue'),

      children: [
        {
          path: '/home/dashboard',
          component: () => import('@/views/Home/dashboard/index.vue'),
        },
        {
          path: '/home/org',
          component: () => import('@/views/Home/org/index.vue'),
        },
        {
          path: '/home/customer',
          component: () => import('@/views/Home/customer/index.vue'),
        },
        {
          path: '/home/monery',
          component: () => import('@/views/Home/monery/index.vue'),
        },
        {
          path: '/home/setting',
          component: () => import('@/views/Home/setting/index.vue'),
        },
      ],
    },
  ],
})
// 路由开始切换时
router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  next()
})

// 路由切换结束时
router.afterEach(() => {
  NProgress.done() // 结束进度条
})

export default router
