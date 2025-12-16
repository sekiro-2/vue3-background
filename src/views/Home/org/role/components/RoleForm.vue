<script setup>
import { onMounted, ref, watch, computed, nextTick } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { messageInfo } from '@/utils'
import { Plus } from '@element-plus/icons-vue'
import { useRoleDataStore } from '@/stores'
// 获取部门数据
const loading = ref(true)
const roleDataStore = useRoleDataStore()
const roleList = computed(() => roleDataStore.roleDataList)
watch(
  roleList,
  (newval) => {
    if (newval) {
      loading.value = false
    }
  },
  {
    immediate: true,
  },
)
// 数据操作
const popoverIndex = ref(-1)
const handleDelete = async (id) => {
  popoverIndex.value = -1
  roleDataStore.deleteDeptList(id)
  await nextTick()
  messageInfo('删除成功', 'success')
}
const emit = defineEmits(['show'])
const showData = (row) => {
  emit('show', row)
}
onMounted(() => {
  roleDataStore.getRoleList()
})
</script>

<template>
  <div class="role">
    <div class="roleheader">
      <span class="text-#333 leading-31px">角色管理</span>
      <el-button type="primary" class="button" @click="openShowMask">
        <el-icon><Plus /></el-icon>添加员工</el-button
      >
    </div>
    <el-divider />
    <el-table v-loading="loading" :data="roleList" stripe style="width: 100%" @row-click="showData">
      <!-- 角色名称 -->
      <el-table-column prop="roleName" label="角色名称" />
      <!-- 角色标识 -->
      <el-table-column prop="roleCode" label="角色标识" />
      <!-- 描述 -->
      <el-table-column prop="roleInfo" label="描述" />
      <!-- 操作 -->
      <el-table-column label="操作">
        <template #default="scope">
          <div style="width: 76px">
            <el-button
              type="primary"
              :disabled="scope.row.id === 1"
              :icon="Edit"
              circle
              @click="roleDataStore.toggleMosk"
            />
            <el-popover
              :visible="popoverIndex === scope.$index"
              placement="top"
              :width="180"
              :disabled="scope.row.id === 1"
            >
              <p>你确认要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" text @click="popoverIndex = -1">取消</el-button>
                <el-button size="small" type="primary" @click="handleDelete(scope.row.id)">
                  确认
                </el-button>
              </div>
              <template #reference>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  :disabled="scope.row.id === 1"
                  @click.prevent.stop="popoverIndex = scope.$index"
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
.role {
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  height: 100%;
  .roleheader {
    display: flex;
    justify-content: space-between;
  }
}
</style>
