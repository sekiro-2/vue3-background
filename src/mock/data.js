// 初始数据

import Mock from 'mockjs'
// 随机生成员工数据
const departments = ['研发部', '人力资源部', '市场部', '产品部', '运营部', '财务部', '行政部', '销售部', '技术支持部']
const positions = {
  '研发部': ['前端开发工程师', '后端开发工程师', '测试工程师'],
  '技术支持部': ['运维工程师', '技术支持工程师'],
  '人力资源部': ['HR专员'],
  '行政部': ['行政助理'],
  '财务部': ['财务专员'],
  '市场部': ['市场专员'],
  '销售部': ['销售代表'],
  '产品部': ['产品经理', 'UI/UX 设计师'],
  '运营部': ['运营专员']
}
const statusOptions = ['在职', '试用期', '休假', '离职']
export const employData = Array.from({ length: 20 }).map((_, index) => {
  const department = Mock.Random.pick(departments)
  const position = Mock.Random.pick(positions[department])
  const hireDate = Mock.Random.date('yyyy-MM-dd')
  const name = Mock.Random.cname()
  const phone = '1' + Mock.Random.pick(['3', '4', '5', '6', '7', '8', '9']) + Mock.Random.string('number', 9)
  const email = `${name}${index}@example.com`
  return {
    id: (index + 1).toString(),
    name,
    email,
    phone,
    department,
    position,
    hireDate,
    status: Mock.Random.pick(statusOptions)
  }
})

//随机生成部门信息
const rootDepartments = [
  '行政人事部',
  '财务部',
  '市场部',
  '销售部',
  '技术研发部',
  '运维部',
  '产品部',
  '客服中心'
]
const subDepartments = {
  '行政人事部': ['招聘组', '培训组', '薪酬绩效组'],

  '财务部': ['会计组', '成本控制组', '出纳组'],

  '市场部': ['品牌推广组', '活动策划组', '市场调研组'],

  '销售部': ['大客户组', '渠道销售组', '售前支持组'],

  '技术研发部': [
    '前端组',
    '后端组',
    '测试组'
  ],

  '运维部': ['网络运维组', '服务器运维组', '安全组'],

  '产品部': ['产品经理组', '交互设计组', 'UI设计组'],

  '客服中心': ['售后支持组', '热线客服组', '客户关怀组']
}


const deptStatus = ['启用', '停用']
export function genCode() {
  const letters = Mock.Random.string('upper', 2) // 2位大写字母
  const numbers = String(Mock.Random.integer(0, 9999)).padStart(4, '0') // 4位数字
  return letters + numbers
}
export const deptData = Array.from({ length: 30 }).map((_, index) => {
  let parentDept = Mock.Random.pick(rootDepartments)
  const dept =
    Mock.Random.boolean(4, 1)   // 80% 有子部门，20% 无
      ? Mock.Random.pick(subDepartments[parentDept])
      : parentDept
  const createTime = Mock.Random.date('yyyy-MM-dd')
  const manager = Mock.Random.cname()
  const code = genCode()
  let status = Mock.Random.pick(deptStatus)
  let number = 0


  if (dept === parentDept) {
    parentDept = '公司'
    number = Mock.Random.integer(50, 200)
    status = '启用'
  }
  else {
    number = Mock.Random.integer(10, 20)

  }
  return {
    parentDept,
    dept,
    manager,
    createTime,
    code,
    status,
    number
  }
})

// 读取 localStorage，如果没有就用初始数据
export let employTableData = JSON.parse(localStorage.getItem('employTableData') || 'null') || employData
export let deptTableData = JSON.parse(localStorage.getItem('deptTableData') || 'null') || deptData

// 用于更新 localStorage
export function saveData() {
  localStorage.setItem('employTableData', JSON.stringify(employTableData))
  localStorage.setItem('deptTableData', JSON.stringify(deptTableData))

}
