import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore('appStore', () => {
  // 侧边栏折叠或false展开
  const sideBarStare = ref(false)
  const userName = ref('张三')
  const toggleSideBar = () => {
    sideBarStare.value = !sideBarStare.value
  }
  return {
    sideBarStare, userName,
    toggleSideBar
  }

},
  {
    persist: {
      key: "appStore",
      storage: localStorage,
      // paths: ["sideBarStare",],
    },
  }
)
