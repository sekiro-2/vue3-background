<script setup>
import RoleForm from './components/RoleForm.vue'
import PermissionForm from './components/PermissionForm.vue'
import ChangeRole from './components/ChangeRole.vue'
import { onMounted, ref, watch, computed } from 'vue'

// 缓存名字对应路由名字
defineOptions({
  name: 'Role',
})
const data = ref()
const show = (row) => {
  data.value = row
}
</script>

<template>
  <div class="roleContent">
    <RoleForm @show="show"></RoleForm>
    <PermissionForm :data="data"></PermissionForm>
    <ChangeRole :data="data"></ChangeRole>
  </div>
</template>
<style scoped lang="scss">
.roleContent {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 12px;
  @media (max-width: 1224px) {
    grid-template-columns: 1fr;
  }
}
</style>
