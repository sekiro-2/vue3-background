import Mock from 'mockjs';


// 生成员工列表接口
Mock.mock('/api/employees', 'get', () => {
  return {
    code: 0,
    data: Mock.mock({
      'employees|10-20': [  // 生成10~20条员工
        {
          'id|+1': 1,        // id 自增
          'name': '@name',   // 随机姓名
          'age|22-50': 1,    // 年龄 22~50
          'email': '@email',           // 随机邮箱
          'phone': /^1[3456789]\d{9}$/ // 随机手机号
        }
      ]
    }).employees
  };
});

// 设置延迟
Mock.setup({ timeout: '500-1000' });
