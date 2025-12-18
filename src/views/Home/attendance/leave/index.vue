<script setup>
import { ref, reactive, computed } from 'vue'
import { messageInfo, exportExcel } from '@/utils'

// 组件命名（路由 keepAlive 依赖）
defineOptions({ name: 'AttendanceLeave' })

// 筛选条件（与其他页面一致的字段风格）
const filters = reactive({
  keyword: '',
  dept: 'all',
  type: 'all',
  status: 'pending',
  dateRange: [],
})

// 模型数据（后续替换真实接口）
const leaves = ref([
  {
    id: 'L202501',
    employee: '张三',
    dept: '技术部',
    type: '事假',
    start: '2025-12-20',
    end: '2025-12-21',
    days: 2,
    status: 'pending',
    approver: '王主管',
    appliedAt: '2025-12-18',
  },
  {
    id: 'L202502',
    employee: '李四',
    dept: '人事部',
    type: '年假',
    start: '2025-12-22',
    end: '2025-12-24',
    days: 3,
    status: 'approved',
    approver: '刘经理',
    appliedAt: '2025-12-17',
  },
  {
    id: 'L202503',
    employee: '王五',
    dept: '市场部',
    type: '病假',
    start: '2025-12-19',
    end: '2025-12-19',
    days: 1,
    status: 'rejected',
    approver: '赵主管',
    appliedAt: '2025-12-16',
  },
])

// 多选集合
const selection = ref([])

// 过滤后的列表
const filteredLeaves = computed(() => {
  return leaves.value.filter((l) => {
    const kw = filters.keyword.trim()
    const inKw = kw ? l.employee.includes(kw) || l.approver.includes(kw) || l.id.includes(kw) : true
    const inDept = filters.dept === 'all' ? true : l.dept === filters.dept
    const inType = filters.type === 'all' ? true : l.type === filters.type
    const inStatus = filters.status === 'all' ? true : l.status === filters.status
    const inDate =
      filters.dateRange?.length === 2
        ? l.start >= filters.dateRange[0] && l.end <= filters.dateRange[1]
        : true
    return inKw && inDept && inType && inStatus && inDate
  })
})

// 重置筛选
const resetFilters = () => {
  Object.assign(filters, {
    keyword: '',
    dept: 'all',
    type: 'all',
    status: 'pending',
    dateRange: [],
  })
}

// 批量/单条状态更新（与“员工管理”操作风格一致）
const setStatus = (rows, status) => {
  if (!rows.length) return messageInfo('请选择记录', 'warning')
  rows.forEach((r) => {
    const idx = leaves.value.findIndex((i) => i.id === r.id)
    if (idx > -1) leaves.value[idx].status = status
  })
  messageInfo(status === 'approved' ? '已通过审批' : '已驳回审批', 'success')
}

const approve = (row) => setStatus([row], 'approved')
const reject = (row) => setStatus([row], 'rejected')

const handleSelectionChange = (rows) => {
  selection.value = rows
}

// 导出当前筛选结果
const exportData = () => {
  const data = filteredLeaves.value.map(
    ({ id, employee, dept, type, start, end, days, status, approver, appliedAt }) => ({
      单号: id,
      员工: employee,
      部门: dept,
      类型: type,
      开始: start,
      结束: end,
      天数: days,
      状态: status,
      审批人: approver,
      申请时间: appliedAt,
    }),
  )
  exportExcel(data, '请假记录')
}

// 详情弹窗
const detailVisible = ref(false)
const detailRow = ref(null)
const openDetail = (row) => {
  detailRow.value = row
  detailVisible.value = true
}
</script>

<template>
  <!-- 头部操作区：与组织人事的头部样式统一 -->
  <div class="leaveHeader block">
    <div class="title">请假管理</div>
    <div class="actions">
      <el-button type="success" @click="setStatus(selection, 'approved')">批量通过</el-button>
      <el-button type="warning" @click="setStatus(selection, 'rejected')">批量驳回</el-button>
      <el-button @click="exportData">导出</el-button>
    </div>
  </div>

  <!-- 筛选区卡片 -->
  <div class="card block filterCard">
    <el-form :model="filters" inline label-width="80" size="large">
      <el-form-item label="关键字">
        <el-input v-model="filters.keyword" placeholder="员工/审批人/单号" clearable />
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="filters.dept" class="select">
          <el-option label="全部" value="all" />
          <el-option label="技术部" value="技术部" />
          <el-option label="人事部" value="人事部" />
          <el-option label="市场部" value="市场部" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="filters.type" class="select">
          <el-option label="全部" value="all" />
          <el-option label="事假" value="事假" />
          <el-option label="病假" value="病假" />
          <el-option label="年假" value="年假" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filters.status" class="select">
          <el-option label="全部" value="all" />
          <el-option label="待审" value="pending" />
          <el-option label="通过" value="approved" />
          <el-option label="驳回" value="rejected" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="filters.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- 表格卡片 -->
  <div class="card">
    <el-table
      :data="filteredLeaves"
      @selection-change="handleSelectionChange"
      size="large"
      stripe
      highlight-current-row
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="id" label="单号" width="120" />
      <el-table-column prop="employee" label="员工" width="120" />
      <el-table-column prop="dept" label="部门" width="120" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column label="起止时间" min-width="220">
        <template #default="{ row }">{{ row.start }} 至 {{ row.end }}</template>
      </el-table-column>
      <el-table-column prop="days" label="天数" width="80" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag
            :type="
              row.status === 'approved' ? 'success' : row.status === 'rejected' ? 'warning' : 'info'
            "
            >{{ row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="approver" label="审批人" width="120" />
      <el-table-column prop="appliedAt" label="申请时间" width="120" />
      <el-table-column label="操作" fixed="right" width="220">
        <template #default="{ row }">
          <el-button size="small" @click="openDetail(row)">查看</el-button>
          <el-button size="small" type="success" @click="approve(row)">通过</el-button>
          <el-button size="small" type="warning" @click="reject(row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="detailVisible" title="请假详情" width="520px">
      <div v-if="detailRow">
        <p>单号：{{ detailRow.id }}</p>
        <p>员工：{{ detailRow.employee }}（{{ detailRow.dept }}）</p>
        <p>类型：{{ detailRow.type }}</p>
        <p>时间：{{ detailRow.start }} 至 {{ detailRow.end }}（{{ detailRow.days }} 天）</p>
        <p>状态：{{ detailRow.status }} / 审批人：{{ detailRow.approver }}</p>
        <p>申请时间：{{ detailRow.appliedAt }}</p>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="success" @click="approve(detailRow)">通过</el-button>
        <el-button type="warning" @click="reject(detailRow)">驳回</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.block {
  margin-bottom: 24px;
}
$cardBgc: #fff;

.leaveHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: 60px;
  border-radius: 16px;
  background-color: $cardBgc;
  .title {
    font-size: 16px;
    font-weight: 600;
  }
  .actions {
    display: flex;
    gap: 10px;
    .el-button {
      height: 40px;
    }
  }
}

.card {
  background-color: $cardBgc;
  border-radius: 16px;
  padding: 20px;
}

.filterCard {
  .select {
    width: 160px;
  }
  :deep(.el-input__wrapper) {
    height: 40px;
  }
  :deep(.el-select__wrapper) {
    height: 40px;
  }
  :deep(.el-date-editor) {
    height: 40px;
  }
  :deep(.el-form) {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 12px;
  }
  :deep(.el-form-item) {
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
