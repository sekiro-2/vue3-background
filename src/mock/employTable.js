import Mock from 'mockjs';
import { employTableData } from './data/employData'
import { saveData } from './data/saveData';



// 请求员工列表接口
Mock.mock('/api/employees', 'get', () => {
  return {
    code: 200,
    data: employTableData
  };
});
// 筛选数据
Mock.mock('/api/employees/sort', 'post', (options) => {
  const body = JSON.parse(options.body)

  const deptSort = body.deptSort
  const statusSort = body.statusSort
  const positionSort = body.positionSort


  let result = employTableData

  // 部门筛选
  if (deptSort && deptSort !== 'all') {
    result = result.filter(item => item.department === deptSort)
  }

  // 状态筛选
  if (statusSort && statusSort !== 'all') {
    result = result.filter(item => item.status === statusSort)
  }

  // 职位筛选
  if (positionSort && positionSort !== 'all') {
    result = result.filter(item => item.position === positionSort)
  }

  return {
    code: 200,
    data: result,
  }
})

// 删除员工
Mock.mock(/\/api\/employees\/delete/, 'delete', (options) => {
  const url = new URL('http://mock.com' + options.url)
  const id = url.searchParams.get('id')

  // 删除数组中匹配 id 的项
  const index = employTableData.findIndex(item => item.id === id)
  if (index > -1) {
    employTableData.splice(index, 1)
    saveData('employTableData', employTableData)

  }
  return {
    code: 200,
    msg: '删除成功',
    data: employTableData
  }
})
// 添加员工
Mock.mock('/api/employees/add', 'post', (options) => {
  const body = JSON.parse(options.body) // 前端发送的员工信息
  // 生成唯一 id
  const maxId = employTableData.length > 0 ? Math.max(...employTableData.map(i => Number(i.id))) : 0
  const newEmployee = {
    ...body,
    id: String(maxId + 1),
  }

  // 添加到数组
  employTableData.unshift(newEmployee)
  saveData('employTableData', employTableData)

  return {
    code: 200,
    msg: '添加成功',
    data: employTableData
  }
})
// 编辑员工
Mock.mock('/api/employees/edit', 'post', (options) => {
  const body = JSON.parse(options.body);
  const index = employTableData.findIndex(emp => emp.id === body.id);
  if (index > -1) {
    employTableData[index] = { ...employTableData[index], ...body };

    saveData('employTableData', employTableData)

    return { code: 200, message: '修改成功', data: employTableData[index] };
  } else {
    return { code: 404, message: '员工不存在' };
  }
});


// 设置延迟
Mock.setup({ timeout: '500-1000' });
saveData('employTableData', employTableData)
