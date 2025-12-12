<script setup>
import { reactive, watch, ref } from 'vue'
import { CloseBold, Phone } from '@element-plus/icons-vue'
import { deptStaffOptions, statusStaffOptions, positionOptions, messageInfo } from '@/utils'
import { addEmployListAPI, editEmployListAPI } from '@/apis/employ'

const props = defineProps({
  data: Object,
  type: String,
})
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
const emit = defineEmits(['close', 'finish'])
// 点击关闭按钮调用
const handleClose = () => {
  emit('close')
}
const formRef = ref(null)

const form = reactive({
  id: props.data?.id || '',
  name: props.data?.name || '',
  email: props.data?.email || '',
  phone: props.data?.phone || '',
  department: props.data?.department || '',
  position: props.data?.position || '',
  hireDate: props.data?.hireDate || '',
  status: props.data?.status || '',
})
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],

  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: ['blur', 'change'] },
  ],

  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] },
  ],

  department: [{ required: true, message: '请选择部门', trigger: 'change' }],

  position: [{ required: true, message: '请选择职位', trigger: 'change' }],

  hireDate: [{ required: true, message: '请选择入职时间', trigger: 'change' }],

  status: [{ required: true, message: '请选择员工状态', trigger: 'change' }],
}

const addEmployList = async () => {
  try {
    await formRef.value.validate()
    await addEmployListAPI(form)
    // 重置表单，保持响应式
    Object.keys(form).forEach((key) => {
      form[key] = ''
    })
    messageInfo('添加成功', 'success')
    emit('finish')
    // 这里写提交接口
  } catch (err) {
    console.log('校验失败', err)
  }
}

const editEmployList = async () => {
  console.log(form)
  await editEmployListAPI(form)
  messageInfo('编辑成功', 'success')

  emit('finish')
}
</script>

<template>
  <div class="editbox">
    <div class="editheader">
      <h3 v-if="props?.type === 'edit'">编辑员工信息</h3>
      <h3 v-else>添加员工信息</h3>
      <span class="deleteicon" @click="handleClose"
        ><el-icon :size="18"><CloseBold /></el-icon
      ></span>
    </div>
    <el-divider />
    <div class="editcontain">
      <el-form
        ref="formRef"
        label-position="top"
        :model="form"
        :rules="rules"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <div class="formblock">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
        </div>
        <div class="formblock">
          <el-form-item label="部门" prop="department">
            <el-select v-model="form.department" style="width: 192px">
              <el-option
                v-for="item in deptStaffOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-select v-model="form.position" style="width: 192px">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="formblock">
          <el-form-item label="入职时间" prop="hireDate" style="width: 192px">
            <el-date-picker
              v-model="form.hireDate"
              type="datetime"
              placeholder="选择入职时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" style="width: 192px">
              <el-option
                v-for="item in statusStaffOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-divider />
    <div class="editbottom">
      <el-button @click="handleClose">取消</el-button>

      <el-button type="primary" @click="editEmployList" v-if="props?.type === 'edit'"
        >编辑员工</el-button
      >
      <el-button type="primary" @click="addEmployList" v-else>添加员工</el-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.editbox {
  width: 430px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  padding: 15px;
  .editheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .deleteicon {
      &:hover {
        transform: scale(0.8);
      }
    }
  }
  .editcontain {
    .formblock {
      display: flex;
      justify-content: space-between;
    }
  }
}
.editbottom {
  display: flex;
  justify-content: end;
}
</style>
