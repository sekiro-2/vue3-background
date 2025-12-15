<template>
  <div class="job-management-container">
    <!-- 搜索筛选区域 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="岗位名称">
          <el-input v-model="searchForm.jobName" placeholder="请输入岗位名称" clearable />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="searchForm.department" placeholder="请选择部门" clearable>
            <el-option label="技术部" value="Tech" />
            <el-option label="人力资源部" value="HR" />
            <el-option label="市场部" value="Marketing" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="在招" value="Active" />
            <el-option label="已满员" value="Inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮区域 -->
    <el-card class="operation-card">
      <div class="header-controls">
        <el-button type="primary" icon="Plus" @click="handleAddJob">新增岗位</el-button>
        <el-button
          type="danger"
          icon="Delete"
          :disabled="selectedRows.length === 0"
          @click="handleBatchDelete"
          >批量删除</el-button
        >
      </div>
    </el-card>

    <!-- 岗位列表区域 -->
    <el-card>
      <el-table
        :data="jobList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="jobName" label="岗位名称" width="180" />
        <el-table-column prop="department" label="所属部门" width="120" />
        <el-table-column prop="level" label="职级" width="100" />
        <el-table-column prop="headcount" label="任职人数/编制" width="150">
          <template #default="{ row }"> {{ row.currentCount }} / {{ row.headcount }} </template>
        </el-table-column>
        <el-table-column prop="status" label="岗位状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Active' ? 'success' : 'info'">
              {{ row.status === 'Active' ? '在招' : '已满员' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEditJob(row)">编辑</el-button>
            <el-button link type="primary" size="small" @click="viewDetails(row)">详情</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑岗位模态框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      :before-close="handleCloseDialog"
    >
      <el-form :model="jobForm" ref="jobFormRef" label-width="100px" :rules="jobFormRules">
        <el-form-item label="岗位名称" prop="jobName">
          <el-input v-model="jobForm.jobName" />
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-select v-model="jobForm.department" placeholder="请选择部门">
            <el-option label="技术部" value="Tech" />
            <el-option label="人力资源部" value="HR" />
            <el-option label="市场部" value="Marketing" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位编制" prop="headcount">
          <el-input-number v-model="jobForm.headcount" :min="1" />
        </el-form-item>
        <el-form-item label="岗位职责" prop="responsibilities">
          <el-input type="textarea" v-model="jobForm.responsibilities" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitJobForm">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'

// 接口定义
interface Job {
  id: number
  jobName: string
  department: string
  level: string
  currentCount: number
  headcount: number
  status: 'Active' | 'Inactive'
  createTime: string
  responsibilities?: string
}

// 搜索表单
const searchForm = reactive({
  jobName: '',
  department: '',
  status: '',
})

// 岗位列表数据
const jobList = ref<Job[]>([])
const loading = ref(false)
const selectedRows = ref<Job[]>([])

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

// 模态框相关
const dialogVisible = ref(false)
const dialogTitle = ref('新增岗位')
const jobFormRef = ref<FormInstance>()
const jobForm = reactive<Omit<Job, 'id' | 'createTime' | 'currentCount'>>({
  jobName: '',
  department: '',
  level: 'L1', // 默认值
  headcount: 1,
  status: 'Active',
  responsibilities: '',
})

const jobFormRules = reactive<FormRules>({
  jobName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
  department: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
  headcount: [{ required: true, message: '请输入岗位编制数', trigger: 'blur' }],
})

// 模拟 API 请求
const fetchJobList = () => {
  loading.value = true
  // 模拟异步请求数据
  setTimeout(() => {
    const mockData: Job[] = [
      {
        id: 1,
        jobName: '前端工程师',
        department: '技术部',
        level: 'L2',
        currentCount: 2,
        headcount: 5,
        status: 'Active',
        createTime: '2023-01-01',
      },
      {
        id: 2,
        jobName: '后端工程师',
        department: '技术部',
        level: 'L3',
        currentCount: 5,
        headcount: 5,
        status: 'Inactive',
        createTime: '2023-01-05',
      },
      {
        id: 3,
        jobName: 'HR专员',
        department: '人力资源部',
        level: 'L1',
        currentCount: 1,
        headcount: 2,
        status: 'Active',
        createTime: '2023-02-01',
      },
      {
        id: 4,
        jobName: '市场经理',
        department: '市场部',
        level: 'L4',
        currentCount: 1,
        headcount: 1,
        status: 'Inactive',
        createTime: '2023-03-10',
      },
    ]
    // 实际项目中需要根据搜索和分页条件筛选数据
    jobList.value = mockData
    pagination.total = mockData.length
    loading.value = false
  }, 500)
}

onMounted(fetchJobList)

// 事件处理函数
const handleSearch = () => {
  pagination.currentPage = 1
  fetchJobList()
}

const resetSearch = () => {
  searchForm.jobName = ''
  searchForm.department = ''
  searchForm.status = ''
  pagination.currentPage = 1
  fetchJobList()
}

const handleSelectionChange = (val: Job[]) => {
  selectedRows.value = val
}

const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  fetchJobList()
}

const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  fetchJobList()
}

const handleAddJob = () => {
  dialogTitle.value = '新增岗位'
  // 重置表单字段
  Object.assign(jobForm, {
    jobName: '',
    department: '',
    level: 'L1',
    headcount: 1,
    status: 'Active',
    responsibilities: '',
  })
  dialogVisible.value = true
}

const handleEditJob = (row: Job) => {
  dialogTitle.value = '编辑岗位'
  // 填充表单数据
  Object.assign(jobForm, row)
  dialogVisible.value = true
}

const viewDetails = (row: Job) => {
  ElMessageBox.alert(
    `
      <p><strong>岗位名称:</strong> ${row.jobName}</p>
      <p><strong>所属部门:</strong> ${row.department}</p>
      <p><strong>职级:</strong> ${row.level}</p>
      <p><strong>编制:</strong> ${row.currentCount} / ${row.headcount}</p>
      <p><strong>职责描述:</strong> ${row.responsibilities || '暂无描述'}</p>
    `,
    '岗位详情',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
    },
  )
}

const handleDelete = (row: Job) => {
  ElMessageBox.confirm(`确定要删除岗位 "${row.jobName}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 调用删除 API 接口
      console.log('Deleting job:', row.id)
      ElMessage.success('删除成功！')
      fetchJobList() // 重新加载数据
    })
    .catch(() => {})
}

const handleBatchDelete = () => {
  // 批量删除逻辑
  ElMessage.warning('批量删除功能待实现')
}

const handleCloseDialog = () => {
  jobFormRef.value?.resetFields()
  dialogVisible.value = false
}

const submitJobForm = () => {
  jobFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('Submitting job form:', jobForm)
      // 调用保存或更新 API 接口
      ElMessage.success('保存成功！')
      dialogVisible.value = false
      fetchJobList() // 重新加载数据
    } else {
      ElMessage.warning('请检查表单填写！')
      return false
    }
  })
}
</script>

<style scoped>
.job-management-container {
  padding: 20px;
}

.search-card,
.operation-card {
  margin-bottom: 20px;
}

.header-controls {
  display: flex;
  justify-content: flex-start;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
