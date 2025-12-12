import Mock from 'mockjs';

import { deptTableData, saveData } from './data'

// 请求部门列表接口
Mock.mock('/api/dept', 'get', () => {
  return {
    code: 200,
    data: deptTableData
  };
});
// 设置延迟
Mock.setup({ timeout: '500-1000' });
