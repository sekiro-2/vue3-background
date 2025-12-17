import { defineStore } from "pinia";
import { ref } from "vue";
import { getRoleListAPI, deleteRoleListAPI, editRoleListAPI, addRoleListAPI } from "@/apis/role";
export const useRoleDataStore = defineStore('roleDataStore', () => {
  const roleDataList = ref()
  const showRoleMosk = ref(false)
  function toggleMosk() {
    showRoleMosk.value = !showRoleMosk.value
  }

  async function getRoleList() {
    const res = await getRoleListAPI()
    roleDataList.value = res.data
  }
  async function deleteRoleList(id) {
    const res = await deleteRoleListAPI(id)
    roleDataList.value = res.data
  }
  async function editRoleList(form) {
    const res = await editRoleListAPI(form)
    roleDataList.value = res.data
  }
  async function addRoleList(form) {
    const res = await addRoleListAPI(form)
    roleDataList.value = res.data
  }
  return {
    roleDataList,
    showRoleMosk,
    toggleMosk,
    getRoleList,
    deleteRoleList,
    editRoleList,
    addRoleList
  }
})
