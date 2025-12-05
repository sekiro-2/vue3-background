<script setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores'
import { ElMessage, ElMessageBox } from 'element-plus'
const userName = useAppStore().userName
const dropdown = ref()
function showClick() {
  dropdown.value.handleOpen()
}
const close = () => {
  ElMessageBox.confirm('是否要退出系统', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'primary',
        message: '取消退出',
      })
    })
}
</script>

<template>
  <div class="user">
    <div class="avatar" alt="用户头像" @click="showClick">{{ userName.charAt(0) }}</div>
    <div class="name">
      <el-dropdown ref="dropdown" trigger="click">
        <div>
          <span class="el-dropdown-link">
            {{ userName }}
          </span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">个人资料</el-dropdown-item>
            <el-dropdown-item command="e" divided @click="close">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="scss">
.user {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 12px;
  cursor: pointer;
  .avatar {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background: #3da359;
    color: #fff;
    margin: 0 5px;
  }
  .name {
    .el-dropdown {
      z-index: 1;
      margin-top: 3px;
    }
  }
}
</style>
