// axios的基础封装
import axios from 'axios'
const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// axios请求拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
request.interceptors.response.use(
  // 成功回调，进行数据剥离，
  (res) => res.data,

  // 失败回调
  (e) => {
    return Promise.reject(e)
  }
)

export default request
