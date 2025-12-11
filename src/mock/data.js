// 初始数据


export const initialData = [
  {
    id: '1',
    name: '张明',
    email: 'zhangming@example.com',
    phone: '13800138001',
    department: '技术部',
    position: '前端开发工程师',
    hireDate: '2022-06-15',
    status: '在职',
  },
  {
    id: '2',
    name: '李丽',
    email: 'lili@example.com',
    phone: '13800138002',
    department: '技术部',
    position: '后端开发工程师',
    hireDate: '2021-08-10',
    status: '在职',
  },
  {
    id: '3',
    name: '王强',
    email: 'wangqiang@example.com',
    phone: '13800138003',
    department: '人力资源部',
    position: 'HR专员',
    hireDate: '2023-01-05',
    status: '试用期',
  },
  {
    id: '4',
    name: '赵敏',
    email: 'zhaomin@example.com',
    phone: '13800138004',
    department: '市场部',
    position: '市场专员',
    hireDate: '2020-12-20',
    status: '在职',
  },
  {
    id: '5',
    name: '孙浩',
    email: 'sunhao@example.com',
    phone: '13800138005',
    department: '技术部',
    position: '测试工程师',
    hireDate: '2022-03-18',
    status: '休假',
  },
  {
    id: '6',
    name: '周婷',
    email: 'zhouting@example.com',
    phone: '13800138006',
    department: '产品部',
    position: '产品经理',
    hireDate: '2021-07-25',
    status: '在职',
  },
  {
    id: '7',
    name: '吴磊',
    email: 'wulei@example.com',
    phone: '13800138007',
    department: '运营部',
    position: '运营专员',
    hireDate: '2023-02-15',
    status: '在职',
  },
  {
    id: '8',
    name: '陈晨',
    email: 'chenchen@example.com',
    phone: '13800138008',
    department: '财务部',
    position: '财务专员',
    hireDate: '2022-11-01',
    status: '在职',
  },
  {
    id: '9',
    name: '刘洋',
    email: 'liuyang@example.com',
    phone: '13800138009',
    department: '技术部',
    position: '运维工程师',
    hireDate: '2020-09-30',
    status: '离职',
  },
  {
    id: '10',
    name: '何静',
    email: 'hejing@example.com',
    phone: '13800138010',
    department: '行政部',
    position: '行政助理',
    hireDate: '2021-04-12',
    status: '在职',
  }
]

// 读取 localStorage，如果没有就用初始数据
export let deptTableData = JSON.parse(localStorage.getItem('deptTableData') || 'null') || initialData

// 用于更新 localStorage
export function saveData() {
  localStorage.setItem('deptTableData', JSON.stringify(deptTableData))
}
