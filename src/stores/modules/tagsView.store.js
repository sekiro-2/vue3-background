import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useTagsViewStore = defineStore('TagsViewStore', () => {
  const tagsView = ref([])

  function addView(view) {
    const find = tagsView.value.find(item => item?.title === view.title)
    if (!find) {
      tagsView.value.push(view)
    }

  }
  function deletView(view) {
    tagsView.value = tagsView.value.filter(tag => tag.fullPath !== view.fullPath)
  }

  return {
    tagsView,
    addView,
    deletView
  }
}, {
  persist: {
    key: "tagsView",
    storage: localStorage,

  },
})
