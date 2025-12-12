import request from "@/utils"
export function getDeptListAPI() {
  return request({
    url: '/dept',
    method: 'get',
  })
}
