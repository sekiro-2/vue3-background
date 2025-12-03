import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore('appStore', () => {
  // 侧边栏折叠或false展开
  const sideBarStare = ref(false)
  const toggleSideBar = () => {
    sideBarStare.value = !sideBarStare.value
  }
  return {
    sideBarStare,
    toggleSideBar
  }

},
  {
    persist: {
      key: "appStore",
      storage: localStorage,
      paths: ["sideBarStare"],
    },
  }
)
