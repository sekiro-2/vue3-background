import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
// 头部切换路由进度条
import 'nprogress/nprogress.css' // 引入样式


const Layout = () => import('@/Layout/index.vue')
export const constantRoutes = [
  {
    path: '/',
    name: 'Root',
    meta: { hidden: true },
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    meta: { hidden: true },
    component: () => import('@/views/Login/index.vue'),
  },
  // --------------------
  // 1. 数据展示
  // --------------------
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'WorkIcon',
          affix: true
        },
        component: () => import('@/views/Home/dashboard/index.vue')
      }
    ]
  },
  // --------------------
  // 2. 组织人事
  // --------------------
  {
    path: '/org',
    name: 'Org',
    component: Layout,
    redirect: '/org/employee',
    meta: { title: '组织人事', icon: 'OrganizeIcon' },
    children: [
      {
        path: '/org/employee',
        name: 'Employee',

        component: () => import('@/views/Home/org/employ/employ.vue'),
        meta: { title: '员工管理', icon: 'employee' },

      },
      {
        path: '/org/dept',
        name: 'Dept',
        component: () => import('@/views/Home/org/dept/dept.vue'),
        meta: { title: '部门管理', icon: 'department' }
      },
      {
        path: '/org/post',
        name: 'Post',
        component: () => import('@/views/Home/org/post.vue'),
        meta: { title: '岗位管理', icon: 'position' },
      },
      {
        path: '/org/role',
        name: 'Role',
        component: () => import('@/views/Home/org/role.vue'),
        meta: { title: '角色与权限', icon: 'permission' }
      }
    ]
  },

  // --------------------
  // 3. 考勤管理
  // --------------------
  {
    path: '/attendance',
    name: 'Attendance',
    component: Layout,
    redirect: '/attendance/record',
    meta: { title: '考勤管理', icon: 'WorkIcon' },
    children: [
      {
        path: '/attendance/record',
        name: 'AttendanceRecord',
        // component: () => import('@/views/attendance/record.vue'),
        meta: { title: '打卡记录', icon: 'Document' }
      },
      {
        path: '/attendance/schedule',
        name: 'AttendanceSchedule',
        // component: () => import('@/views/attendance/schedule.vue'),
        meta: { title: '排班管理', icon: 'Collection' }
      },
      {
        path: '/attendance/leave',
        name: 'AttendanceLeave',
        // component: () => import('@/views/attendance/leave.vue'),
        meta: { title: '请假管理', icon: 'Tickets' }
      }
    ]
  },

  // --------------------
  // 4. 流程中心
  // --------------------
  {
    path: '/workflow',
    name: 'Workflow', component: Layout,
    redirect: '/workflow/todo',
    meta: { title: '流程中心', icon: 'Stamp' },
    children: [
      {
        path: '/workflow/todo',
        name: 'WorkflowTodo',
        // component: () => import('@/views/workflow/todo.vue'),
        meta: { title: '我的审批', icon: 'Bell' }
      },
      {
        path: '/workflow/manage',
        name: 'WorkflowManage',
        // component: () => import('@/views/workflow/manage.vue'),
        meta: { title: '流程管理', icon: 'Setting' }
      }
    ]
  },

  // --------------------
  // 5. 业务模块
  // --------------------
  {
    path: '/business',
    name: 'Business', component: Layout,
    redirect: '/business/customer',
    meta: { title: '业务模块', icon: 'Briefcase' },
    children: [
      {
        path: '/business/customer',
        name: 'Customer',
        // component: () => import('@/views/business/customer.vue'),
        meta: { title: '客户管理', icon: 'User' }
      },
      {
        path: '/business/order',
        name: 'Order',
        // component: () => import('@/views/business/order.vue'),
        meta: { title: '订单管理', icon: 'Document' }
      },
      {
        path: '/business/product',
        name: 'Product',
        // component: () => import('@/views/business/product.vue'),
        meta: { title: '产品管理', icon: 'Box' }
      }
    ]
  },

  // --------------------
  // 6. 数据报表
  // --------------------
  {
    path: '/report',
    name: 'Report', component: Layout,
    redirect: '/report/operation',
    meta: { title: '数据报表', icon: 'PieChart' },
    children: [
      {
        path: '/report/operation',
        name: 'OperationReport',
        // component: () => import('@/views/report/operation.vue'),
        meta: { title: '运营数据', icon: 'TrendCharts' }
      },
      {
        path: '/report/employeeNum',
        name: 'EmployeeReport',
        // component: () => import('@/views/report/employee.vue'),
        meta: { title: '员工数据统计', icon: 'Histogram' }
      }
    ]
  },

  // --------------------
  // 7. 系统工具
  // --------------------
  {
    path: '/tools',
    name: 'Tools', component: Layout,
    redirect: '/tools/log',
    meta: { title: '系统工具', icon: 'Tools' },
    children: [
      {
        path: '/tools/log',
        name: 'LogManage',
        // component: () => import('@/views/tools/log.vue'),
        meta: { title: '日志管理', icon: 'Document' }
      },
      {
        path: '/tools/online',
        name: 'OnlineUser',
        // component: () => import('@/views/tools/online.vue'),
        meta: { title: '在线用户', icon: 'UserFilled' }
      }
    ]
  },

  // --------------------
  // 8. 系统设置
  // --------------------
  {
    path: '/setting',
    name: 'Setting', component: Layout,
    redirect: '/setting/profile',
    meta: { title: '系统设置', icon: 'Setting' },
    children: [
      {
        path: '/setting/profile',
        name: 'Profile',
        // component: () => import('@/views/setting/profile.vue'),
        meta: { title: '个人中心', icon: 'User' }
      },
      {
        path: '/setting/system',
        name: 'SystemConfig',
        // component: () => import('@/views/setting/system.vue'),
        meta: { title: '系统参数', icon: 'Tools' }
      }
    ]
  },

  // --------------------
  // 9. 404
  // --------------------
  {
    path: '/:pathMatch(.*)*',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/:pathMatch(.*)*',
        meta: { hidden: true },
        component: () => import('@/views/Error/404.vue')
      }
    ]
  }
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
