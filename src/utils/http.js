// axios 基础封装
import axios from 'axios'
const request = axios.create({
  // 支持通过环境变量配置后端地址：VITE_API_BASE_URL
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

// 请求拦截：可在此注入 Token 等认证信息
request.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// 响应拦截：统一返回数据结构与错误信息
request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const message = error?.response?.data?.message || error.message || '网络错误'
    return Promise.reject(new Error(message))
  }
)

export default request
