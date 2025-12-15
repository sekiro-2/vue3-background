<template>
  <div class="role-permission-container">
    <el-row :gutter="20">
      <!-- 左侧：角色列表卡片 -->
      <el-col :span="10">
        <el-card class="role-list-card">
          <template #header>
            <div class="card-header">
              <span>角色管理</span>
              <el-button type="primary" icon="Plus" @click="handleAddRole">新增角色</el-button>
            </div>
          </template>

          <el-table
            :data="roleList"
            highlight-current-row
            @current-change="handleCurrentRoleChange"
            style="width: 100%"
          >
            <el-table-column prop="roleName" label="角色名称" />
            <el-table-column prop="roleCode" label="角色标识" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button link type="primary" size="small" @click="handleEditRole(row)"
                  >编辑</el-button
                >
                <el-button link type="danger" size="small" @click="handleDeleteRole(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 右侧：权限分配卡片 -->
      <el-col :span="14">
        <el-card class="permission-assign-card">
          <template #header>
            <span>权限分配 - {{ currentRole ? currentRole.roleName : '请选择角色' }}</span>
          </template>
          <div v-if="currentRole">
            <el-tree
              ref="permissionTreeRef"
              :data="menuList"
              show-checkbox
              node-key="id"
              :props="treeProps"
              check-strictly
              default-expand-all
            />
            <div class="permission-footer">
              <el-button type="primary" @click="handleSavePermissions">保存权限</el-button>
              <el-button @click="handleClearPermissions">清空选择</el-button>
            </div>
          </div>
          <el-empty v-else description="选择一个角色以配置权限" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增/编辑角色模态框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px">
      <el-form :model="roleForm" ref="roleFormRef" label-width="80px" :rules="roleFormRules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" />
        </el-form-item>
        <el-form-item label="角色标识" prop="roleCode">
          <el-input v-model="roleForm.roleCode" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitRoleForm">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'

// --- 类型定义 ---
interface Role {
  id: number
  roleName: string
  roleCode: string
  description: string
  menuIds?: number[] // 当前角色拥有的菜单ID列表
}

interface Menu {
  id: number
  label: string
  children?: Menu[]
}

// --- 状态管理 ---
const roleList = ref<Role[]>([])
const currentRole = ref<Role | null>(null)
const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('新增角色')

// 角色表单
const roleFormRef = ref<any>(null)
const roleForm = reactive<Omit<Role, 'id'>>({
  roleName: '',
  roleCode: '',
  description: '',
})

const roleFormRules = reactive({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
})

// 权限树相关
const menuList = ref<Menu[]>([])
const permissionTreeRef = ref<InstanceType<typeof ElTree>>()
const treeProps = {
  children: 'children',
  label: 'label',
}

// --- 模拟数据和 API 请求 ---
const fetchRoleList = () => {
  loading.value = true
  setTimeout(() => {
    roleList.value = [
      {
        id: 1,
        roleName: '超级管理员',
        roleCode: 'ADMIN',
        description: '拥有所有权限',
        menuIds: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        id: 2,
        roleName: '普通用户',
        roleCode: 'USER',
        description: '基础浏览权限',
        menuIds: [1, 2, 3],
      },
      {
        id: 3,
        roleName: 'HR管理员',
        roleCode: 'HR_ADMIN',
        description: '管理人事相关',
        menuIds: [1, 4, 5],
      },
    ]
    loading.value = false
  }, 300)
}

const fetchMenuList = () => {
  // 模拟获取所有菜单结构（树形结构）
  menuList.value = [
    {
      id: 1,
      label: '系统管理',
      children: [
        { id: 2, label: '用户管理' },
        { id: 3, label: '角色与权限' },
        { id: 4, label: '菜单管理' },
      ],
    },
    {
      id: 5,
      label: '员工管理',
      children: [
        { id: 6, label: '员工列表' },
        { id: 7, label: '考勤管理' },
      ],
    },
  ]
}

onMounted(() => {
  fetchRoleList()
  fetchMenuList()
})

// --- 事件处理函数 ---

// 角色列表行选中变化
const handleCurrentRoleChange = (row: Role | undefined) => {
  currentRole.value = row || null
  if (row) {
    // 使用 nextTick 确保 Tree 组件已经渲染完毕再设置选中状态
    nextTick(() => {
      permissionTreeRef.value?.setCheckedKeys(row.menuIds || [], false)
    })
  }
}

// 新增角色按钮
const handleAddRole = () => {
  dialogTitle.value = '新增角色'
  Object.assign(roleForm, { roleName: '', roleCode: '', description: '' })
  dialogVisible.value = true
}

// 编辑角色按钮
const handleEditRole = (row: Role) => {
  dialogTitle.value = '编辑角色'
  Object.assign(roleForm, row)
  dialogVisible.value = true
}

// 删除角色
const handleDeleteRole = (row: Role) => {
  ElMessageBox.confirm(`确定要删除角色 "${row.roleName}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      console.log('Deleting role:', row.id)
      ElMessage.success('删除成功！')
      fetchRoleList()
    })
    .catch(() => {})
}

// 提交角色表单（新增/编辑）
const submitRoleForm = () => {
  roleFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('Submitting role form:', roleForm)
      // 调用 API 保存数据
      ElMessage.success('保存成功！')
      dialogVisible.value = false
      fetchRoleList()
    }
  })
}

// 保存权限分配
const handleSavePermissions = () => {
  if (!currentRole.value) return

  // 获取所有选中和半选中的节点 keys
  const checkedKeys = permissionTreeRef.value?.getCheckedKeys(false) as number[]
  // const halfCheckedKeys = permissionTreeRef.value?.getHalfCheckedKeys() as number[];
  // const allPermissionIds = [...checkedKeys, ...halfCheckedKeys];
  const allPermissionIds = checkedKeys // 在 check-strictly 模式下只需要全选的 keys

  console.log(`Saving permissions for role ${currentRole.value.id}:`, allPermissionIds)
  // 调用 API 保存权限到后端
  ElMessage.success('权限分配保存成功！')
  // 更新本地数据（可选）
  const roleIndex = roleList.value.findIndex((r) => r.id === currentRole.value?.id)
  if (roleIndex !== -1) {
    roleList.value[roleIndex].menuIds = allPermissionIds
  }
}

// 清空权限选择
const handleClearPermissions = () => {
  permissionTreeRef.value?.setCheckedKeys([], false)
  ElMessage.info('已清空权限选择')
}
</script>

<style scoped>
.role-permission-container {
  padding: 20px;
}

.search-card,
.operation-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.permission-assign-card {
  min-height: 400px;
}

.permission-footer {
  margin-top: 20px;
  text-align: right;
}
</style>
