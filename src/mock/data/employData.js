import Mock from 'mockjs'
// 随机生成员工数据
const departments = ['研发部', '人力资源部', '市场部', '产品部', '运营部', '财务部', '行政人事部', '销售部', '技术支持部']
const positions = {
  '研发部': ['前端开发工程师', '后端开发工程师', '测试工程师'],
  '技术支持部': ['运维工程师', '技术支持工程师'],
  '人力资源部': ['HR专员'],
  '行政人事部': ['行政助理'],
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
export let employTableData = JSON.parse(localStorage.getItem('employTableData') || 'null') || employData
