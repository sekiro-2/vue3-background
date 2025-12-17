<script setup>
import { ref } from 'vue'
import { Download, Plus, Upload } from '@element-plus/icons-vue'
import { usedeptDataStore } from '@/stores'
const searcherDept = ref()
const deptDataStore = usedeptDataStore()
</script>
<template>
  <div class="deptheader block">
    <div class="sortstaff">
      <el-cascader
        v-model="searcherDept"
        :options="deptDataStore.treeData"
        :props="{ checkStrictly: true }"
        placeholder="筛选"
        clearable
      />
    </div>
    <div class="addstaff">
      <el-button
        type="primary"
        class="button"
        @click="deptDataStore.openShowMask({ type: 'add', data: {} })"
      >
        <el-icon><Plus /></el-icon>添加部门</el-button
      >
      <el-button class="button">
        <el-icon><Upload /></el-icon>导出数据</el-button
      >
      <el-button class="button">
        <el-icon><Download /></el-icon>批量导入</el-button
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.block {
  margin-bottom: 24px;
}
$cardBgc: #fff;
.deptheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: 60px;
  border-radius: 16px;
  background-color: $cardBgc;
  .addstaff {
    display: flex;
    .button {
      height: 40px;
      width: 100%;
    }
  }
  .sortstaff {
    display: flex;

    :deep(.el-input__wrapper) {
      height: 40px !important;
    }
  }
}
</style>
