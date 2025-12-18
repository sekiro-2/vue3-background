<script setup>
import { ref, reactive } from 'vue'
import { Download, Plus, Upload } from '@element-plus/icons-vue'
import { usedeptDataStore } from '@/stores'
import { statusDeptOptions } from '@/utils'

const deptDataStore = usedeptDataStore()

const formRef = ref()
const form = reactive({
  searcherDept: '',
  status: 'all',
})

const handleSort = () => {
  deptDataStore.sortDeptLst(form)
}
// 重置筛选表单
const reset = (formEl) => {
  formEl.resetFields()
  deptDataStore.sortDeptLst(form)
}
</script>
<template>
  <div class="deptheader block">
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
    <div class="sortstaff">
      <el-form :model="form" ref="formRef" inline>
        <el-form-item prop="searcherDept">
          <el-cascader
            v-model="form.searcherDept"
            :options="deptDataStore.treeData"
            :props="{ checkStrictly: true }"
            placeholder="全部部门"
            clearable
            @change="handleSort"
          />
        </el-form-item>
        <el-form-item prop="status">
          <el-select class="select" v-model="form.status" placeholder="选择" @change="handleSort">
            <el-option
              v-for="item in [{ label: '所有状态', value: 'all' }, ...statusDeptOptions]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" plain @click="reset(formRef)"> 重置 </el-button>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss">
.el-button {
  height: 40px !important;
}

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
    .select {
      margin: 0 10px;
      :deep(.el-select__wrapper) {
        height: 40px !important; // 自定义高度
        width: 120px;
      }
    }
  }
}
</style>
