import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore('appStore', () => {
  // 侧边栏折叠或false展开
  const sideBarStare = ref(false)
  // 用户名字
  const userName = ref('张三')
  const openSideBar = () => {
    sideBarStare.value = false
  }
  const closeSideBar = () => {
    sideBarStare.value = true
  }

  const toggleSideBar = () => {
    sideBarStare.value = !sideBarStare.value
  }
  // 系统侧边栏颜色
  const themeBackgroundColor = ref('#fff')
  // 系统侧边栏文字颜色
  const themeTextColor = ref('#000')

  const themeIndex = ref('1')
  // logo显示
  const logoShow = ref(true)
  // 标签页面显示
  const tagsViewShow = ref(true)
  // 菜单展开方式显示
  const menuShow = ref(false)


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
    logoShow, tagsViewShow, menuShow, closeSideBar,
    openSideBar,
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
