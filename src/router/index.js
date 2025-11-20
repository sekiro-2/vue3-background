import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
// 头部切换路由进度条
import 'nprogress/nprogress.css' // 引入样式



const Layout = () => import('@/Layout/index.vue')
export const constantRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Home/dashboard/index.vue')
      },
      {
        path: '/monery',
        name: 'monery',
        component: () => import('@/views/Home/monery/index.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,

})
// 全局注册路由
export function setupRouter(app) {
  app.use(router);
}
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
