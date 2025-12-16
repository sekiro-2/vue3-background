<script setup>
import { reactive, watch } from 'vue'
import { useRoleDataStore } from '@/stores'
import { CloseBold } from '@element-plus/icons-vue'
import { messageInfo } from '@/utils'
const roleDataStore = useRoleDataStore()
const props = defineProps({
  data: Object,
  type: String,
})
const form = reactive({
  id: props.data?.id || '',
  roleName: props.data?.roleName || '',
  roleInfo: props.data?.roleInfo || '',
})

const editRoleList = () => {
  roleDataStore.editDeptList(form)
  roleDataStore.toggleMosk()
  messageInfo('编辑成功', 'success')
}

const handleClose = () => {
  roleDataStore.toggleMosk()
}
// 表单数据监听回显
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      Object.keys(form).forEach((key) => {
        form[key] = newData[key] || ''
      })
    }
  },
  { immediate: true }, // 组件初始化时也执行一次
)
</script>
<template>
  <div v-show="roleDataStore.showDeptMosk" class="modal-mask" @click.self="handleClose">
    <div class="rolebox">
      <div class="roleheader">
        <h3>编辑员工信息</h3>
        <!-- <h3 v-else>添加员工信息</h3> -->
        <span class="deleteicon" @click="handleClose"
          ><el-icon :size="18"><CloseBold /></el-icon
        ></span>
      </div>
      <el-divider />
      <div class="rolecontain">
        <el-form
          ref="formRef"
          label-position="top"
          :model="form"
          :rules="rules"
          label-width="auto"
          style="max-width: 600px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.roleName" />
          </el-form-item>
          <el-form-item label="描述" prop="name">
            <el-input v-model="form.roleInfo" type="textarea" resize="none" />
          </el-form-item>
        </el-form>
      </div>
      <el-divider />
      <div class="rolebottom">
        <el-button @click="handleClose">取消</el-button>

        <el-button type="primary" @click="editRoleList">编辑员工</el-button>
        <!-- <el-button type="primary" @click="addEmployList" v-else>添加员工</el-button> -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.modal-mask {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 9999;
  justify-content: right;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.rolebox {
  width: 430px;
  background-color: #fff;
  border-radius: 20px;
  padding: 15px;
  .roleheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .deleteicon {
      &:hover {
        transform: scale(0.8);
      }
    }
  }
  .rolecontain {
    .formblock {
      display: flex;
      justify-content: space-between;
    }
  }
  .rolebottom {
    display: flex;
    justify-content: end;
  }
}
</style>
