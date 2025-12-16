

export const roleData = [
  // 1️⃣ 系统管理员（全部权限）
  {
    id: 1,
    roleName: '系统管理员',
    roleCode: 'ADMIN',
    roleInfo: '拥有系统全部权限，负责系统配置与用户管理',
    PermissionForm: [
      '首页',
      '组织人事',
      '考勤管理',
      '流程中心',
      '业务模块',
      '数据报表',
      '系统工具',
      '系统设置'
    ]
  },

  // 2️⃣ 人事管理员
  {
    id: 2,
    roleName: '人事管理员',
    roleCode: 'HR_MANAGER',
    roleInfo: '负责人事档案、员工入离职及岗位管理',
    PermissionForm: [
      '首页',
      '组织人事',
      '考勤管理'
    ]
  },

  // 3️⃣ 部门负责人
  {
    id: 3,
    roleName: '部门负责人',
    roleCode: 'DEPT_LEADER',
    roleInfo: '负责本部门人员与业务审批',
    PermissionForm: [
      '首页',
      '考勤管理',
      '流程中心',
      '数据报表'
    ]
  },

  // 4️⃣ 普通员工
  {
    id: 4,
    roleName: '普通员工',
    roleCode: 'EMPLOYEE',
    roleInfo: '仅可查看与自身相关的数据',
    PermissionForm: [
      '首页',
      '流程中心'
    ]
  },

  // 5️⃣ 访客
  {
    id: 5,
    roleName: '访客',
    roleCode: 'GUEST',
    roleInfo: '只读权限，用于临时访问系统',
    PermissionForm: [
      '首页',

    ]
  }
]

export let roleTableData = JSON.parse(localStorage.getItem('roleTableData') || 'null') || roleData
