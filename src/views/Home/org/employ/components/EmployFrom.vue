<script setup>
import { onMounted, ref, watch } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import Editemploy from './Editemploy.vue'
import ShowMaskItem from './ShowMaskItem.vue'
import { getEmployListAPI, deleteEmployListAPI } from '@/apis/employ'
import { messageInfo } from '@/utils'

const props = defineProps({
  updated: Boolean,
})

const deptTableData = ref([])
const loading = ref(true)
const getEmployList = async () => {
  const res = await getEmployListAPI()
  deptTableData.value = res.data
  loading.value = false
}
const handleSelectionChange = (rows) => {
  // console.log('已选择的行：', rows)
}
// 控制哪一行的删除弹窗显示
const popoverIndex = ref(-1)
const handleDelete = async (row) => {
  const res = await deleteEmployListAPI(row.id)
  deptTableData.value = res.data
  popoverIndex.value = -1
  messageInfo('删除成功', 'success')
}

// 编辑蒙层
const showMask = ref(false)
const data = ref()
const openShowMask = (row) => {
  data.value = row
  showMask.value = true
}
const closeShowMask = () => {
  showMask.value = false
}
watch(
  () => props.updated,
  (newData) => {
    if (newData) {
      handleOK()
    }
  },
  { immediate: true }, // 组件初始化时也执行一次
)

const handleOK = () => {
  closeShowMask()
  getEmployList()
}

onMounted(() => {
  getEmployList()
})
</script>
<template>
  <div class="deptmain block">
    <el-table
      v-loading="loading"
      :data="deptTableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="员工信息"> </el-table-column>
      <el-table-column prop="department" label="部门"> </el-table-column>
      <el-table-column prop="position" label="职位"> </el-table-column>
      <el-table-column prop="hireDate" label="入职时间"> </el-table-column>
      <el-table-column prop="phone" label="联系方式">
        <template #default="scope">
          <div>{{ scope.row.phone }}</div>
          <div>{{ scope.row.email }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" circle @click="openShowMask(scope.row)" />
          <el-popover :visible="popoverIndex === scope.$index" placement="top" :width="180">
            <p>你确认要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="popoverIndex = -1">取消</el-button>
              <el-button size="small" type="primary" @click="handleDelete(scope.row)">
                确认
              </el-button>
            </div>
            <template #reference>
              <el-button type="danger" :icon="Delete" circle @click="popoverIndex = scope.$index" />
            </template>
          </el-popover> </template
      ></el-table-column>
    </el-table>
  </div>

  <ShowMaskItem
    :showMask="showMask"
    @close="closeShowMask"
    :data="data"
    type="edit"
    @finish="handleOK"
  ></ShowMaskItem>
</template>
<style scoped lang="scss">
$cardBgc: #fff;
.deptmain {
  width: 1600px;
  border-radius: 16px;
  padding: 20px;
  background-color: $cardBgc;
}
</style>
