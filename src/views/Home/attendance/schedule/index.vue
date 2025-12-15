<template>
  <div class="attendance-records-container">
    <!-- 搜索筛选区域 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="员工/部门">
          <el-input v-model="searchForm.employeeNameOrId" placeholder="员工姓名/工号" clearable />
        </el-form-item>
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="打卡状态">
          <el-select v-model="searchForm.status" placeholder="所有状态" clearable>
            <el-option label="正常" value="Normal" />
            <el-option label="迟到" value="Late" />
            <el-option label="早退" value="EarlyLeave" />
            <el-option label="缺勤" value="Absent" />
            <el-option label="异常待处理" value="Pending" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据展示与操作区域 -->
    <el-card>
      <div class="header-controls">
        <el-button type="primary" icon="Download" @click="handleExport">导出记录</el-button>
      </div>

      <el-table :data="attendanceList" style="width: 100%" v-loading="loading" border>
        <el-table-column prop="employeeName" label="员工姓名" width="120" />
        <el-table-column prop="employeeId" label="工号" width="100" />
        <el-table-column prop="department" label="部门" width="150" />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="checkInTime" label="上班打卡时间" width="140" />
        <el-table-column prop="checkOutTime" label="下班打卡时间" width="140" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="工作时长(小时)" width="120" />
        <el-table-column prop="location" label="打卡地点" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="viewDetails(row)"
              >详情/申诉</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'

// --- 类型定义 ---
interface AttendanceRecord {
  id: number
  employeeName: string
  employeeId: string
  department: string
  date: string
  checkInTime: string
  checkOutTime: string
  status: 'Normal' | 'Late' | 'EarlyLeave' | 'Absent' | 'Pending'
  duration: number
  location: string
}

// --- 状态管理 ---
const searchForm = reactive({
  employeeNameOrId: '',
  dateRange: [] as string[],
  status: '',
})

const attendanceList = ref<AttendanceRecord[]>([])
const loading = ref(false)

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

// --- 辅助函数 ---
const getStatusTagType = (status: AttendanceRecord['status']) => {
  switch (status) {
    case 'Normal':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Absent':
      return 'danger'
    case 'Late':
    case 'EarlyLeave':
      return 'info'
    default:
      return 'info'
  }
}

const getStatusText = (status: AttendanceRecord['status']) => {
  switch (status) {
    case 'Normal':
      return '正常'
    case 'Late':
      return '迟到'
    case 'EarlyLeave':
      return '早退'
    case 'Absent':
      return '缺勤'
    case 'Pending':
      return '异常待处理'
    default:
      return '未知'
  }
}

// --- 模拟 API 请求 ---
const fetchAttendanceRecords = () => {
  loading.value = true
  setTimeout(() => {
    // 模拟数据生成
    const mockData: AttendanceRecord[] = [
      {
        id: 1,
        employeeName: '张三',
        employeeId: 'E1001',
        department: '技术部',
        date: '2023-10-27',
        checkInTime: '09:00:00',
        checkOutTime: '18:00:00',
        status: 'Normal',
        duration: 9,
        location: '公司总部',
      },
      {
        id: 2,
        employeeName: '李四',
        employeeId: 'E1002',
        department: '市场部',
        date: '2023-10-27',
        checkInTime: '09:15:30',
        checkOutTime: '18:00:00',
        status: 'Late',
        duration: 8.75,
        location: '公司总部',
      },
      {
        id: 3,
        employeeName: '王五',
        employeeId: 'E1003',
        department: '技术部',
        date: '2023-10-27',
        checkInTime: '09:00:00',
        checkOutTime: '17:30:15',
        status: 'EarlyLeave',
        duration: 8.5,
        location: '公司总部',
      },
      {
        id: 4,
        employeeName: '赵六',
        employeeId: 'E1004',
        department: '人力资源部',
        date: '2023-10-27',
        checkInTime: '09:00:00',
        checkOutTime: '00:00:00',
        status: 'Pending',
        duration: 0,
        location: '公司总部',
      },
      // ... 更多数据
    ]
    // 实际项目中会根据搜索条件和服务端分页返回精确数据
    attendanceList.value = mockData
    pagination.total = 50 // 模拟总条数
    loading.value = false
  }, 500)
}

onMounted(fetchAttendanceRecords)

// --- 事件处理函数 ---
const handleSearch = () => {
  pagination.currentPage = 1
  fetchAttendanceRecords()
}

const resetSearch = () => {
  searchForm.employeeNameOrId = ''
  searchForm.dateRange = []
  searchForm.status = ''
  pagination.currentPage = 1
  fetchAttendanceRecords()
}

const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  fetchAttendanceRecords()
}

const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  fetchAttendanceRecords()
}

const handleExport = () => {
  ElMessage.success('开始导出考勤记录...')
  // 调用 API 触发文件下载
}

const viewDetails = (row: AttendanceRecord) => {
  // 弹窗展示详细的打卡日志、申诉记录等
  ElMessage.info(`查看 ${row.employeeName} 在 ${row.date} 的详细打卡记录。`)
}
</script>

<style scoped>
.attendance-records-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.header-controls {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
