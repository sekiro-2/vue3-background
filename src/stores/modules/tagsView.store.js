import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useTagsViewStore = defineStore('TagsViewStore', () => {
  const tagsView = ref([])

  const cachedViews = ref([])

  /** 添加标签 + 缓存 */
  function addView(view) {
    const { name, title, fullPath, keepAlive } = view
    const exists = tagsView.value.find(
      item => item.fullPath === fullPath,
    )
    if (!exists) {
      tagsView.value.push(view)
    }

    // 缓存页面
    if (keepAlive && name) {
      if (!cachedViews.value.includes(name)) {
        cachedViews.value.push(name)
      }
    }
  }
  /** 删除标签 + 清缓存 */
  function deletView(view) {
    // 1️⃣ 删除 tag
    tagsView.value = tagsView.value.filter(
      tag => tag.fullPath !== view.fullPath,
    )
    // 2️⃣ 删除缓存
    if (view.name) {
      cachedViews.value = cachedViews.value.filter(
        v => v !== view.name,
      )
    }
  }

  return {
    tagsView,
    cachedViews,
    addView,
    deletView
  }
}, {
  persist: {
    key: "tagsView",
    storage: localStorage,
    paths: ['tagsView'],

  },
})
