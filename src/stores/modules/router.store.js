import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { constantRoutes } from '@/router'
export const useRouterStore = defineStore('routerStore', () => {
  const router = useStorage("router", constantRoutes);

  return {
    router
  }
})
