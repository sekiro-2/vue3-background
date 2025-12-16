import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue';
import { getDeptListAPI, deleteDeptListAPI, editDeptListAPI, addDeptListAPI } from '@/apis/dept'
import { createDeptTree } from '@/utils/createTree';
export const usedeptDataStore = defineStore('deptDataStore', () => {
  const deptList = ref([])
  // 开关编辑，添加框
  const showDeptMosk = ref(false)
  // 区分编辑与添加框
  const showMoskType = ref()
  // 编辑回显数据
  const editData = ref()
  const openShowMask = (object) => {
    showMoskType.value = object.type
    editData.value = object.data
    showDeptMosk.value = true
  }
  const closeShowMask = () => {
    showDeptMosk.value = false
  }
  async function getDeptList() {
    const res = await getDeptListAPI()

    deptList.value = res.data
  }
  async function deleteDeptList(code) {
    const res = await deleteDeptListAPI(code)
    deptList.value = res.data
  }
  async function editDeptList(form) {
    const res = await editDeptListAPI(form)
    deptList.value = res.data
  }
  async function addDeptList(form) {
    const res = await addDeptListAPI(form)
    deptList.value = res.data
  }
  const treeData = computed(() => {
    return createDeptTree(deptList.value) || []
  })

  return {
    deptList,

    showDeptMosk,
    showMoskType,
    editData,
    treeData,
    getDeptList,
    deleteDeptList,
    openShowMask,
    closeShowMask,
    editDeptList,
    addDeptList
  }
}
)
