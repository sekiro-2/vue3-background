<script setup>
import { reactive, watch, ref } from 'vue'
import { CloseBold, Phone } from '@element-plus/icons-vue'
import { deptStaffOptions, statusDeptOptions, positionOptions, messageInfo } from '@/utils'
import { addEmployListAPI, editEmployListAPI } from '@/apis/employ'
import { usedeptDataStore } from '@/stores/modules/deptData.store'
const deptDataStore = usedeptDataStore()
const props = defineProps({
  showMask: Boolean,
  data: Object,
  type: String,
})

// 表单相关
const formRef = ref(null)
const form = reactive({
  parentDept: props.data?.parentDept || '',
  dept: props.data?.dept || '',
  manager: props.data?.manager || '',
  createTime: props.data?.createTime || '',
  code: props.data?.code || '',
  status: props.data?.status || '',
  number: props.data?.number || null,
})
const rules = reactive({
  manager: [
    { required: true, message: '请输入负责人', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5]+$/, message: '必须是中国名', trigger: 'blur' },
  ],
  dept: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { pattern: /.*(组|部)$/, message: '部门名称必须以“组”或“部”结尾', trigger: 'blur' },
  ],
  parentDept: [{ required: true, message: '请选择上级部门', trigger: 'change' }],
  number: [
    { required: true, message: '请输入人数', trigger: 'change' },
    { type: 'number', min: 1, message: '人数必须大于等于1', trigger: 'change' },
  ],
  createTime: [{ required: true, message: '请选择创建时间', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})

const addEmployList = async () => {
  try {
    await formRef.value.validate()
    deptDataStore.addDeptList(form)
    deptDataStore.closeShowMask()
    messageInfo('添加成功', 'success')
  } catch (err) {
    console.log('校验失败', err)
  }
}

const editEmployList = async () => {
  deptDataStore.editDeptList(form)
  deptDataStore.closeShowMask()
  messageInfo('编辑成功', 'success')
}
const closeShowMask = () => {
  deptDataStore.closeShowMask()
  formRef.value?.clearValidate()
}
const option = ref([])
watch(
  () => form.dept,
  (newData) => {
    if (newData.slice(-1) === '部') {
      form.parentDept = '公司'
      option.value = [{ label: '公司', value: '公司' }]
    } else {
      if (newData.slice(-1) !== '组') {
        form.parentDept = ''
      }

      option.value = deptStaffOptions
    }
  },
  { immediate: true }, // 组件初始化时也执行一次
)
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
  <div v-show="deptDataStore.showDeptMosk" class="modal-mask" @click.self="closeShowMask">
    <div class="editbox">
      <div class="editheader">
        <h3 v-if="props?.type === 'edit'">编辑部门信息</h3>
        <h3 v-else>添加部门信息</h3>
        <span class="deleteicon" @click="closeShowMask"
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
          <div class="formblock">
            <el-form-item label="负责人" prop="manager">
              <el-input v-model="form.manager" style="width: 192px" />
            </el-form-item>
            <el-form-item label="部门" prop="dept">
              <el-input v-model="form.dept" style="width: 192px" />
            </el-form-item>
          </div>
          <div class="formblock">
            <el-form-item label="上级部门" prop="parentDept">
              <el-select v-model="form.parentDept" style="width: 192px">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="人数" prop="number">
              <el-input-number
                v-model="form.number"
                :min="1"
                controls-position="right"
                style="width: 192px"
              />
            </el-form-item>
          </div>
          <div class="formblock">
            <el-form-item label="创建时间" prop="createTime" style="width: 192px">
              <el-date-picker
                v-model="form.createTime"
                type="datetime"
                placeholder="创建时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" style="width: 192px">
                <el-option
                  v-for="item in statusDeptOptions"
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
        <el-button @click="closeShowMask">取消</el-button>

        <el-button type="primary" @click="editEmployList" v-if="props?.type === 'edit'"
          >编辑部门</el-button
        >
        <el-button type="primary" @click="addEmployList" v-else>添加部门</el-button>
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
.editbox {
  width: 430px;
  // height: 500px;
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
  .editbottom {
    display: flex;
    justify-content: end;
  }
}
</style>
