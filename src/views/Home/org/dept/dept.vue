<script setup>
import { ref } from 'vue'
import DeptHeader from './components/DeptHeader.vue'
import DeptTree from './components/DeptTree.vue'
import DeptFrom from './components/DeptFrom.vue'
import DeptEdit from './components/DeptEdit.vue'
import { usedeptDataStore } from '@/stores'
const deptDataStore = usedeptDataStore()
const filterForm = ref({ dept: null, status: 'all' })
const handleFilter = (form) => {
  filterForm.value = form
}
defineOptions({
  name: 'Dept',
})
</script>
<template>
  <DeptHeader @filter="handleFilter"></DeptHeader>
  <div class="contain">
    <DeptTree></DeptTree>
    <DeptFrom :filter="filterForm"></DeptFrom>
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
