import request from "@/utils";

export function getEmployListAPI() {
  return request({
    url: '/employees',
    method: 'get',
  })
}


export function deleteEmployListAPI(id) {
  return request({
    url: '/employees/delete',
    method: 'delete',
    params: {
      id
    }
  })

}
export function addEmployListAPI(employee) {
  return request({
    url: '/employees/add',   // 对应 Mock.js 接口
    method: 'post',
    data: employee           // 使用 data 发送请求体
  })
}
export function editEmployListAPI(data) {
  return request({
    url: '/employees/edit',
    method: 'post',
    data
  });
}
