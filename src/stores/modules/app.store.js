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
  const themeBackgroundColor = ref('#fff')
  const themeTextColor = ref('#000')
  const themeIndex = ref('1')
  const logoShow = ref(true)
  const changeThemeColor = (theme) => {
    themeBackgroundColor.value = theme.backgroudColor,
      themeTextColor.value = theme.textColor,
      themeIndex.value = theme.index
  }


  return {
    sideBarStare,
    userName,
    themeBackgroundColor,
    themeTextColor,
    themeIndex,
    logoShow,
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
