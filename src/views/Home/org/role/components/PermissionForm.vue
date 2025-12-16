<script setup>
import { onMounted, watch, ref, nextTick, reactive } from 'vue'
import { createRoleTree } from '@/utils/createTree'
import { constantRoutes } from '@/router'
import { useRoleDataStore } from '@/stores'
const props = defineProps({
  data: Object,
})
const roleDataStor = useRoleDataStore()
const treeData = createRoleTree(constantRoutes)
let editRole = reactive({})
function handlePermissionChange(node, { checkedNodes }) {
  editRole.PermissionForm = checkedNodes.map((item) => item.label)
}
//
// const handlechnage = () => {
//   roleDataStor.editDeptList(editRole)
// }
const treeRef = ref()
watch(
  () => props.data,
  async (role) => {
    await nextTick() // ⬅️ 等 el-tree 渲染出来
    if (!role || !treeRef.value) return
    // 1️⃣ 先清空
    treeRef.value.setCheckedKeys([])
    // 2️⃣ 回显当前角色权限
    treeRef.value.setCheckedKeys(role.PermissionForm || [])
  },
  { immediate: true },
)
</script>
<template>
  <div class="permission">
    <div class="h-31px leading-31px">角色权限管理-{{ data?.roleName }}</div>
    <el-divider />
    <div>
      <el-empty
        v-if="!props.data"
        :image-size="200"
        description="请选择一个角色分配权限"
        class="p-0px"
      />
      <div v-else>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="treeData"
          node-key="label"
          show-checkbox
          @check="handlePermissionChange"
        />
        <el-button v-if="data.id !== 1" type="primary" class="button mt-60px" @click="handlechnage">
          修改权限</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.permission {
  padding: 20px;
  border-radius: 12px;

  background-color: #fff;
}
</style>
