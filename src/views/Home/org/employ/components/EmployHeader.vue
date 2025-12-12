<script setup>
import { ref } from 'vue'
import { Download, Plus, Upload } from '@element-plus/icons-vue'
import { deptStaffOptions, statusStaffOptions, positionOptions } from '@/utils/index'
import { exportExcel } from '@/utils'
import Editemploy from './Editemploy.vue'
import ShowMaskItem from './ShowMaskItem.vue'
const deptSort = ref('all')
const statusSort = ref('all')
const positionSort = ref('all')
// 添加后告诉employFrom组件更新
const emit = defineEmits(['to-form'])
// 编辑蒙层
const showMask = ref(false)
const openShowMask = () => {
  showMask.value = true
}
const closeShowMask = () => {
  showMask.value = false
}
const handleOk = () => {
  emit('to-form')
  closeShowMask()
}
// const handleExport = () => {
//   exportExcel(tableData.value, '员工数据')
// }
</script>
<template>
  <div class="deptheader block">
    <div class="addstaff">
      <el-button type="primary" class="button" @click="openShowMask">
        <el-icon><Plus /></el-icon>添加员工</el-button
      >
      <el-button class="button" @click="handleExport">
        <el-icon><Upload /></el-icon>导出数据</el-button
      >
      <el-button class="button">
        <el-icon><Download /></el-icon>批量导入</el-button
      >
    </div>
    <div class="sortstaff">
      <el-select v-model="deptSort" class="select">
        <el-option
          v-for="item in [{ label: '全部部门', value: 'all' }, ...deptStaffOptions]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="positionSort" class="select">
        <el-option
          v-for="item in [{ label: '所有状态', value: 'all' }, ...statusStaffOptions]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="statusSort" class="select">
        <el-option
          v-for="item in [{ label: '全部职位', value: 'all' }, ...positionOptions]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
  <ShowMaskItem
    :showMask="showMask"
    @close="closeShowMask"
    @finish="handleOk"
    type="添加"
  ></ShowMaskItem>
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
    .select {
      width: 130px;
      margin: 0 10px;
      :deep(.el-select__wrapper) {
        height: 40px !important; // 自定义高度
      }
    }
  }
}
</style>
