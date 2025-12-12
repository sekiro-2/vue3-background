import Mock from 'mockjs';

import { deptTableData, saveData } from './data'



// 请求员工列表接口
Mock.mock('/api/employees', 'get', () => {
  return {
    code: 200,
    data: deptTableData
  };
});
// 删除员工
Mock.mock(/\/api\/employees/, 'delete', (options) => {
  const url = new URL('http://mock.com' + options.url)
  const id = url.searchParams.get('id')

  // 删除数组中匹配 id 的项
  const index = deptTableData.findIndex(item => item.id === id)
  if (index > -1) {
    deptTableData.splice(index, 1)
    saveData()  // 保存到 localStorage
  }

  return {
    code: 200,
    msg: '删除成功',
    data: deptTableData
  }
})
// 添加员工
Mock.mock('/api/employees', 'post', (options) => {
  const body = JSON.parse(options.body) // 前端发送的员工信息
  // 生成唯一 id
  const maxId = deptTableData.length > 0 ? Math.max(...deptTableData.map(i => Number(i.id))) : 0
  const newEmployee = {
    id: String(maxId + 1),
    ...body
  }

  // 添加到数组
  deptTableData.unshift(newEmployee)
  saveData()  // 保存到 localStorage
  return {
    code: 200,
    msg: '添加成功',
    data: deptTableData
  }
})

Mock.mock('/api/employees/edit', 'post', (options) => {
  const body = JSON.parse(options.body);
  const index = deptTableData.findIndex(emp => emp.id === body.id);
  if (index > -1) {
    deptTableData[index] = { ...deptTableData[index], ...body };
    saveData()
    return { code: 200, message: '修改成功', data: deptTableData[index] };
  } else {
    return { code: 404, message: '员工不存在' };
  }
});


// 设置延迟
Mock.setup({ timeout: '500-1000' });
