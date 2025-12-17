<script setup>
import { usedeptDataStore } from '@/stores/modules/deptData.store'
import { watch, watchEffect, computed, ref } from 'vue'
const deptDataStore = usedeptDataStore()
</script>

<template>
  <div class="depttree">
    <el-tree :default-expand-all="true" :data="deptDataStore.treeData" />
  </div>
</template>
<style scoped lang="scss">
.depttree {
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  width: 300px;
  height: auto;
}
</style>
