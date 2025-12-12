<script setup>
import DeptHeader from './components/DeptHeader.vue'
import DeptTree from './components/DeptTree.vue'
import DeptFrom from './components/DeptFrom.vue'
</script>
<template>
  <DeptHeader></DeptHeader>
  <div class="contain">
    <DeptTree></DeptTree>
    <DeptFrom></DeptFrom>
  </div>
</template>

<style scoped lang="scss">
.contain {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
