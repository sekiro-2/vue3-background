<script setup>
import { onMounted } from 'vue'
import { createRoleTree } from '@/utils/createTree'
import { constantRoutes } from '@/router'
const props = defineProps({
  data: Object,
})
const treeData = createRoleTree(constantRoutes)
console.log(treeData)
</script>
<template>
  <div class="permission">
    <div class="h-31px leading-31px">角色权限管理-{{ '超级管理员' }}</div>
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
          style="max-width: 600px"
          :data="treeData"
          node-key="label"
          :default-checked-keys="['首页', '组织人事']"
          show-checkbox
          :props="defaultProps"
        />
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
