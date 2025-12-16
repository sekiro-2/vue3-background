import Mock from 'mockjs';

import { deptTableData, genCode } from './data/deptData'

// 请求部门列表接口
Mock.mock('/api/dept', 'get', () => {
  return {
    code: 200,
    data: deptTableData
  };
});
// 删除部门
Mock.mock(/\/api\/dept\/delete/, 'delete', (options) => {
  const url = new URL('http://mock.com' + options.url)
  const code = url.searchParams.get('code')
  // 删除数组中匹配 id 的项
  const index = deptTableData.findIndex(item => item.code === code)
  if (index > -1) {
    deptTableData.splice(index, 1)
    localStorage.setItem('employTableData', JSON.stringify(deptTableData))
  }


  return {
    code: 200,
    msg: '删除成功',
    data: deptTableData
  }
})

// 添加部门
Mock.mock('/api/dept/add', 'post', (options) => {
  const body = JSON.parse(options.body) // 前端发送的员工信息
  // 生成唯一 code
  const code = genCode()
  const newEmployee = {
    ...body,
    code

  }

  // 添加到数组
  deptTableData.unshift(newEmployee)
  localStorage.setItem('employTableData', JSON.stringify(deptTableData))
  return {
    code: 200,
    msg: '添加成功',
    data: deptTableData
  }
})

// 编辑部门
Mock.mock('/api/dept/edit', 'post', (options) => {
  const body = JSON.parse(options.body);
  const index = deptTableData.findIndex(emp => emp.code === body.code);
  if (index > -1) {
    deptTableData[index] = { ...deptTableData[index], ...body };
    localStorage.setItem('employTableData', JSON.stringify(deptTableData))
    return { code: 200, message: '修改成功', data: deptTableData };
  } else {
    return { code: 404, message: '员工不存在' };
  }
});
// 设置延迟
Mock.setup({ timeout: '500-1000' });
