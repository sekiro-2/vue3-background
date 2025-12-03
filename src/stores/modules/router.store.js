import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { constantRoutes } from '@/router'

export const useRouterStore = defineStore('routerStore', () => {
  // 刷新更改路由，要不然所有的保存不会覆盖旧数据
  localStorage.removeItem("router")
  const router = useStorage("router", constantRoutes);

  return {
    router
  }
})
