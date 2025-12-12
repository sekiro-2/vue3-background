<script setup>
import { onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { usedeptDataStore } from '@/stores/modules/deptData.store'
import { getDeptListAPI } from '@/apis/dept'
// 获取部门数据
const deptDataStore = usedeptDataStore()
const loading = ref(true)
const deptList = ref()
const getDeptList = async () => {
  await deptDataStore.getDeptList()
  deptList.value = deptDataStore.deptList
  loading.value = false
}

const popoverIndex = ref(-1)
onMounted(() => {
  if (!deptList.value) {
    getDeptList()
  }
})
</script>

<template>
  <div class="deptFrom">
    <el-table
      v-loading="loading"
      :data="deptList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 勾选框 -->
      <el-table-column type="selection" width="55" />

      <!-- 部门名称 -->
      <el-table-column prop="dept" label="部门名称" />

      <!-- 编号 -->
      <el-table-column prop="code" label="编号" />

      <!-- 负责人 -->
      <el-table-column prop="manager" label="负责人" />

      <!-- 上级部门 -->
      <el-table-column prop="parentDept" label="上级部门" />

      <!-- 人数 -->
      <el-table-column prop="number" label="人数" />

      <!-- 状态（保留你原来的彩色样式） -->
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <span
            :class="[
              'px-2 py-1 rounded text-white',
              scope.row.status === '启用'
                ? 'bg-green-500'
                : scope.row.status === '停用'
                  ? 'bg-red-500'
                  : 'bg-gray-500',
            ]"
          >
            {{ scope.row.status }}
          </span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column prop="createTime" label="创建时间" />

      <!-- 操作（ -->
      <el-table-column label="操作">
        <template #default="scope">
          <div style="width: 76px">
            <el-button type="primary" :icon="Edit" circle @click="openShowMask(scope.row)" />
            <el-popover :visible="popoverIndex === scope.$index" placement="top" :width="180">
              <p>你确认要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" text @click="popoverIndex = -1">取消</el-button>
                <el-button size="small" type="primary" @click="handleDelete(scope.row)">
                  确认
                </el-button>
              </div>
              <template #reference>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  @click="popoverIndex = scope.$index"
                />
              </template>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">
.deptFrom {
  flex: 1;
  border-radius: 20px;
  background: #fff;
  width: 300px;
}
</style>
