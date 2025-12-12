import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { ref } from 'vue';
import { getDeptListAPI } from '@/apis/dept'

export const usedeptDataStore = defineStore('deptDataStore', () => {
  const deptList = ref([])
  async function getDeptList() {
    const res = await getDeptListAPI()
    deptList.value = res.data

  }


  return {
    deptList,
    getDeptList
  }
}
)
