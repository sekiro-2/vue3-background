import Mock from 'mockjs';
import { roleTableData } from './data/roleData'
import { saveData } from './data/saveData';



// 请求员工列表接口
Mock.mock('/api/role', 'get', () => {
  return {
    code: 200,
    data: roleTableData
  };
});
// // 删除员工
Mock.mock(/\/api\/role\/delete/, 'delete', (options) => {
  const url = new URL('http://mock.com' + options.url)
  const id = Number(url.searchParams.get('id'))
  // 删除数组中匹配 id 的项
  const index = roleTableData.findIndex(item => item.id === id)
  if (index > -1) {
    roleTableData.splice(index, 1)
    saveData('roleTableData', roleTableData)
  }
  return {
    code: 200,
    msg: '删除成功',
    data: roleTableData
  }
})
// // 添加员工
Mock.mock('/api/role/add', 'post', (options) => {
  const body = JSON.parse(options.body) // 前端发送的员工信息
  // 生成唯一 id
  const maxId = roleTableData.length > 0 ? Math.max(...roleTableData.map(i => Number(i.id))) : 0
  const roleCode = body.roleName + '_' + Math.random().toString(36).slice(2, 6).toUpperCase()
  const newRole = {
    ...body,
    id: Number(maxId + 1),
    roleCode
  }
  // 添加到数组
  roleTableData.push(newRole)
  saveData('roleTableData', roleTableData)

  return {
    code: 200,
    msg: '添加成功',
    data: roleTableData
  }
})
// // 编辑员工
Mock.mock('/api/role/edit', 'post', (options) => {
  const body = JSON.parse(options.body);
  const index = roleTableData.findIndex(emp => emp.id === body.id);
  // console.log(body);
  // console.log(index);
  // console.log(roleTableData[index]);
  // console.log({ ...roleTableData[index], ...body });
  if (index > -1) {
    roleTableData[index] = { ...roleTableData[index], ...body };
    saveData('roleTableData', roleTableData)
    return { code: 200, message: '修改成功', data: roleTableData };
  } else {
    return { code: 404, message: '员工不存在' };
  }
});


// 设置延迟
Mock.setup({ timeout: '500-1000' });
saveData('roleTableData', roleTableData)
