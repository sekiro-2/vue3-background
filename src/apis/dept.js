import request from "@/utils"
export function getDeptListAPI() {
  return request({
    url: '/dept',
    method: 'get',
  })
}

export function deleteDeptListAPI(code) {
  return request({
    url: '/dept/delete',
    method: 'delete',
    params: {
      code
    }
  })

}
export function editDeptListAPI(data) {
  return request({
    url: '/dept/edit',
    method: 'post',
    data
  });
}
export function addDeptListAPI(data) {
  return request({
    url: '/dept/add',
    method: 'post',
    data
  })
}
export function sortDeptListAPI(data) {
  return request({
    url: '/dept/sort',
    method: 'post',
    data
  })
}
