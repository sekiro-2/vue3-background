import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore('appStore', () => {
  // 侧边栏折叠或false展开
  const sideBarStare = ref(false)
  // 用户名字
  const userName = ref('张三')
  const toggleSideBar = () => {
    sideBarStare.value = !sideBarStare.value
  }
  // 系统侧边栏颜色
  const themeColor = ref('#fff')
  const changeThemeColor = (color) => {
    themeColor.value = color
  }


  return {
    sideBarStare,
    userName,
    themeColor,
    toggleSideBar,
    changeThemeColor
  }

},
  {
    persist: {
      key: "appStore",
      storage: localStorage,

    },
  }
)
