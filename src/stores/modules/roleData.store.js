import { defineStore } from "pinia";
import { ref } from "vue";
import { getRoleListAPI, deleteRoleListAPI, editRoleListAPI } from "@/apis/role";
export const useRoleDataStore = defineStore('roleDataStore', () => {
  const roleDataList = ref()
  const showDeptMosk = ref(false)
  function toggleMosk() {
    showDeptMosk.value = !showDeptMosk.value
  }

  async function getRoleList() {
    const res = await getRoleListAPI()
    roleDataList.value = res.data
  }
  async function deleteDeptList(id) {
    const res = await deleteRoleListAPI(id)
    roleDataList.value = res.data
  }
  async function editDeptList(form) {
    const res = await editRoleListAPI(form)
    roleDataList.value = res.data
  }
  return {
    roleDataList,
    showDeptMosk,
    toggleMosk,
    getRoleList,
    deleteDeptList,
    editDeptList
  }
})
