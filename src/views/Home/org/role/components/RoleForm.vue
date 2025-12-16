<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { usedeptDataStore } from '@/stores/modules/deptData.store'
import { messageInfo } from '@/utils'
import { Plus } from '@element-plus/icons-vue'
// 获取部门数据
const deptDataStore = usedeptDataStore()
const loading = ref(false)
const roleList = ref([
  {
    id: 1,
    roleName: '系统管理员',
    roleCode: 'ADMIN',
    roleInfo: '拥有系统全部权限，负责系统配置与用户管理',
  },
  {
    id: 2,
    roleName: '人事管理员',
    roleCode: 'HR_MANAGER',
    roleInfo: '负责人事档案、员工入离职及岗位管理',
  },
  {
    id: 3,
    roleName: '部门负责人',
    roleCode: 'DEPT_LEADER',
    roleInfo: '负责本部门人员与业务审批',
  },
  {
    id: 4,
    roleName: '普通员工',
    roleCode: 'EMPLOYEE',
    roleInfo: '仅可查看与自身相关的数据',
  },
  {
    id: 5,
    roleName: '访客',
    roleCode: 'GUEST',
    roleInfo: '只读权限，用于临时访问系统',
  },
])
// 数据操作
const popoverIndex = ref(-1)
const handleDelete = async (row) => {
  popoverIndex.value = -1
  messageInfo('删除成功', 'success')
}
const emit = defineEmits(['show'])
const showData = (row) => {
  emit('show', row)
}
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
              :icon="Edit"
              circle
              @click="deptDataStore.openShowMask({ type: 'edit', data: scope.row })"
            />
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
