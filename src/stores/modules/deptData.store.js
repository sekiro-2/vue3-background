import { useStorage } from '@vueuse/core'
import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue';
import { getDeptListAPI, deleteDeptListAPI, editDeptListAPI, addDeptListAPI, sortDeptListAPI } from '@/apis/dept'
import { createDeptTree } from '@/utils/createTree';
export const usedeptDataStore = defineStore('deptDataStore', () => {
  const deptList = ref([])
  // 开关编辑，添加框
  const showDeptMosk = ref(false)
  // 区分编辑与添加框
  const showMoskType = ref()

  const loading = ref(false)
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
    loading.value = true
    const res = await getDeptListAPI()
    deptList.value = res.data
    loading.value = false

  }
  async function deleteDeptList(code) {
    loading.value = true
    const res = await deleteDeptListAPI(code)
    deptList.value = res.data
    loading.value = false
  }
  async function editDeptList(form) {
    loading.value = true
    const res = await editDeptListAPI(form)
    deptList.value = res.data
    loading.value = false
  }
  async function addDeptList(form) {
    loading.value = true

    const res = await addDeptListAPI(form)
    deptList.value = res.data
    loading.value = false


  }
  const treeData = computed(() => {
    return createDeptTree(deptList.value) || []
  })
  const sortDeptList = ref([])
  async function sortDeptLst(sort) {
    loading.value = true

    const res = await sortDeptListAPI(sort)
    deptList.value = res.data
    loading.value = false


  }


  return {
    deptList,
    showDeptMosk,
    showMoskType,
    editData,
    treeData,
    sortDeptList,
    loading,
    getDeptList,
    deleteDeptList,
    openShowMask,
    closeShowMask,
    editDeptList,
    addDeptList,
    sortDeptLst,
  }
}
)
