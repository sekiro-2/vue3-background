import request from "@/utils";
export function getRoleListAPI() {
  return request({
    url: 'role',
    method: 'get',
  })
}
export function deleteRoleListAPI(id) {
  return request({
    url: '/role/delete',
    method: 'delete',
    params: {
      id
    }
  })
}
export function editRoleListAPI(data) {
  return request({
    url: '/role/edit',
    method: 'post',
    data
  });
}
export function addRoleListAPI(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}
