<script setup>
import { deptTableData } from '@/utils/index'
import { Edit, Delete } from '@element-plus/icons-vue'
const handleSelectionChange = (rows) => {
  // console.log('已选择的行：', rows)
}
const selectable = (row) => {
  return true // ✅ 允许所有行被选中
}

const handleEdit = (index, row) => {
  deptTableData.value[0].name = '1'
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>
<template>
  <div class="deptmain block">
    <el-table
      :data="deptTableData"
      stripe
      :default-sort="{ prop: 'hireDate', order: 'descending' }"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55"> </el-table-column>
      <el-table-column prop="name" label="员工信息"> </el-table-column>
      <el-table-column prop="department" label="部门"> </el-table-column>
      <el-table-column prop="position" label="职位"> </el-table-column>
      <el-table-column prop="hireDate" sortable label="入职时间"> </el-table-column>
      <el-table-column prop="phone" label="联系方式"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="handleDelete(scope.$index, scope.row)"
          /> </template
      ></el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">
$cardBgc: #fff;
.deptmain {
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  background-color: $cardBgc;
}
</style>
