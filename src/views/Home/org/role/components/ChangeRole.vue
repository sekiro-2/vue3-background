<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoleDataStore } from '@/stores'
import { CloseBold } from '@element-plus/icons-vue'
import { messageInfo } from '@/utils'
const roleDataStore = useRoleDataStore()
const props = defineProps({
  data: Object,
  type: String,
})
const formRef = ref()
const form = reactive({
  id: props.data?.id || '',
  roleName: props.data?.roleName || '',
  roleInfo: props.data?.roleInfo || '',
})
const rules = reactive({
  roleName: [
    { required: true, message: '请输入负责人', trigger: 'blur' },
    { max: 10, message: '最多10个字', trigger: 'blur' },
  ],
  roleInfo: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { max: 30, message: '最多30个字', trigger: 'blur' },
  ],
})
const editRoleList = async () => {
  try {
    await formRef.value.validate()
    roleDataStore.editRoleList(form)
    roleDataStore.toggleMosk()
    messageInfo('编辑成功', 'success')
  } catch (err) {
    console.log('校验失败', err)
  }
}
const addRoleList = async () => {
  try {
    await formRef.value.validate()
    roleDataStore.addRoleList(form)
    roleDataStore.toggleMosk()
    messageInfo('添加成功', 'success')
  } catch (err) {
    console.log('校验失败', err)
  }
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
  <div v-show="roleDataStore.showRoleMosk" class="modal-mask" @click.self="handleClose">
    <div class="rolebox">
      <div class="roleheader">
        <h3 v-if="props.type === 'add'">添加角色信息</h3>
        <h3 v-else>编辑角色信息</h3>
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
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" />
          </el-form-item>
          <el-form-item label="描述" prop="roleInfo">
            <el-input v-model="form.roleInfo" type="textarea" resize="none" />
          </el-form-item>
        </el-form>
      </div>
      <el-divider />
      <div class="rolebottom">
        <el-button @click="handleClose">取消</el-button>

        <el-button type="primary" @click="editRoleList" v-if="props.type == 'edit'"
          >编辑角色</el-button
        >
        <el-button type="primary" @click="addRoleList" v-else>添加角色</el-button>
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
