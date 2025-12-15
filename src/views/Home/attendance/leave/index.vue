<template>
  <div class="employee-leave-container">
    <!-- 假期余额概览 -->
    <el-card class="leave-balance-card">
      <div class="balance-overview">
        <div class="balance-item">
          <h4>年假余额 (天)</h4>
          <p class="balance-value primary">{{ leaveBalances.annualLeave }}</p>
        </div>
        <el-divider direction="vertical" />
        <div class="balance-item">
          <h4>病假余额 (天)</h4>
          <p class="balance-value info">{{ leaveBalances.sickLeave }}</p>
        </div>
        <el-divider direction="vertical" />
        <div class="balance-item">
          <h4>事假余额 (天)</h4>
          <p class="balance-value warning">{{ leaveBalances.personalLeave }}</p>
        </div>
      </div>
    </el-card>

    <el-row :gutter="20">
      <!-- 左侧：请假申请表单 -->
      <el-col :span="8">
        <el-card class="apply-leave-card">
          <template #header>
            <div class="card-header">
              <span>提交请假申请</span>
            </div>
          </template>
          <el-form
            ref="leaveFormRef"
            :model="leaveForm"
            :rules="leaveFormRules"
            label-width="100px"
            class="leave-form"
          >
            <el-form-item label="请假类型" prop="leaveType">
              <el-select v-model="leaveForm.leaveType" placeholder="请选择请假类型">
                <el-option label="年假" value="Annual" />
                <el-option label="病假" value="Sick" />
                <el-option label="事假" value="Personal" />
                <el-option label="婚假" value="Marriage" />
              </el-select>
            </el-form-item>

            <el-form-item label="起止日期" prop="dateRange">
              <el-date-picker
                v-model="leaveForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="总时长 (天)" prop="duration">
              <!-- 实际项目中通常根据起止日期自动计算 -->
              <el-input-number
                v-model="leaveForm.duration"
                :min="0.5"
                :step="0.5"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item label="请假事由" prop="reason">
              <el-input
                type="textarea"
                v-model="leaveForm.reason"
                :rows="4"
                placeholder="请输入详细事由"
              />
            </el-form-item>

            <el-form-item label="证明材料">
              <!-- 附件上传组件 -->
              <el-upload action="#" :auto-upload="false" list-type="text">
                <el-button type="primary">上传附件</el-button>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitLeaveForm">提交申请</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- 右侧：历史记录列表 -->
      <el-col :span="16">
        <el-card>
          <template #header>
            <span>我的请假记录</span>
          </template>
          <el-table :data="leaveRecords" style="width: 100%" border>
            <el-table-column prop="leaveType" label="类型" width="100" />
            <el-table-column prop="startDate" label="开始日期" width="120" />
            <el-table-column prop="endDate" label="结束日期" width="120" />
            <el-table-column prop="duration" label="时长(天)" width="100" />
            <el-table-column prop="status" label="审批状态" width="120">
              <template #default="{ row }">
                <el-tag :type="getStatusTagType(row.status)">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="请假事由" show-overflow-tooltip />
            <el-table-column label="操作" width="100">
              <template #default="{ row }">
                <el-button
                  link
                  type="danger"
                  size="small"
                  :disabled="row.status !== 'Pending'"
                  @click="handleCancel(row)"
                  >撤销</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

// --- 类型定义 ---
interface LeaveBalance {
  annualLeave: number
  sickLeave: number
  personalLeave: number
}

interface LeaveRecord {
  id: number
  leaveType: string
  startDate: string
  endDate: string
  duration: number
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  reason: string
}

// --- 状态管理 ---
const leaveBalances = reactive<LeaveBalance>({
  annualLeave: 0,
  sickLeave: 0,
  personalLeave: 0,
})

const leaveRecords = ref<LeaveRecord[]>([])

const leaveFormRef = ref<FormInstance>()
const leaveForm = reactive({
  leaveType: '',
  dateRange: [] as string[],
  duration: 0.5,
  reason: '',
})

const leaveFormRules: FormRules = {
  leaveType: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
  dateRange: [{ required: true, message: '请选择起止日期', trigger: 'change' }],
  duration: [{ required: true, message: '请输入请假时长', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入请假事由', trigger: 'blur' }],
}

// --- 辅助函数 ---
const getStatusTagType = (status: LeaveRecord['status']) => {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Rejected':
    case 'Cancelled':
      return 'info'
    default:
      return 'info'
  }
}

const getStatusText = (status: LeaveRecord['status']) => {
  switch (status) {
    case 'Approved':
      return '已批准'
    case 'Pending':
      return '待审批'
    case 'Rejected':
      return '已驳回'
    case 'Cancelled':
      return '已撤销'
    default:
      return '未知'
  }
}

// --- 模拟 API 请求 ---
const fetchLeaveData = () => {
  // 模拟获取假期余额
  Object.assign(leaveBalances, {
    annualLeave: 15.5,
    sickLeave: 5.0,
    personalLeave: 10.0,
  })

  // 模拟获取历史记录
  leaveRecords.value = [
    {
      id: 1,
      leaveType: 'Annual',
      startDate: '2023-10-15',
      endDate: '2023-10-17',
      duration: 3,
      status: 'Approved',
      reason: '回家探亲',
    },
    {
      id: 2,
      leaveType: 'Sick',
      startDate: '2023-10-25',
      endDate: '2023-10-25',
      duration: 1,
      status: 'Pending',
      reason: '感冒发烧',
    },
    {
      id: 3,
      leaveType: 'Personal',
      startDate: '2023-09-01',
      endDate: '2023-09-01',
      duration: 1,
      status: 'Rejected',
      reason: '处理个人事务',
    },
  ]
}

onMounted(fetchLeaveData)

// --- 事件处理函数 ---
const submitLeaveForm = () => {
  leaveFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('Submitting leave application:', leaveForm)
      // 调用 API 提交申请
      ElMessage.success('请假申请已提交，等待审批！')
      resetForm()
      fetchLeaveData() // 刷新列表
    } else {
      ElMessage.warning('请检查表单填写！')
    }
  })
}

const resetForm = () => {
  leaveFormRef.value?.resetFields()
  leaveForm.dateRange = [] // resetFields 不会重置数组
}

const handleCancel = (row: LeaveRecord) => {
  // 撤销逻辑
  ElMessage.info(`已撤销 ID 为 ${row.id} 的请假申请。`)
  // 调用 API 更新状态
  fetchLeaveData() // 刷新列表
}
</script>

<style scoped>
.employee-leave-container {
  padding: 20px;
}

.leave-balance-card {
  margin-bottom: 20px;
}

.balance-overview {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.balance-item {
  text-align: center;
}

.balance-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
}

.primary {
  color: var(--el-color-primary);
}
.info {
  color: var(--el-color-info);
}
.warning {
  color: var(--el-color-warning);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leave-form .el-select,
.leave-form .el-input-number {
  width: 100%;
}
</style>
