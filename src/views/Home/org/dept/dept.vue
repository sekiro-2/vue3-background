<script setup>
import { ref } from 'vue'
import DeptHeader from './components/DeptHeader.vue'
import DeptTree from './components/DeptTree.vue'
import DeptFrom from './components/DeptFrom.vue'
import DeptEdit from './components/DeptEdit.vue'
import { usedeptDataStore } from '@/stores'
const deptDataStore = usedeptDataStore()
defineOptions({
  name: 'Dept',
})
</script>
<template>
  <DeptHeader></DeptHeader>
  <div class="contain">
    <DeptTree></DeptTree>
    <DeptFrom></DeptFrom>
  </div>

  <DeptEdit :type="deptDataStore.showMoskType" :data="deptDataStore.editData"></DeptEdit>
</template>

<style scoped lang="scss">
.contain {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
