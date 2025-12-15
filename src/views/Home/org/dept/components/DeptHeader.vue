<script setup>
import { ref } from 'vue'
import { Download, Plus, Upload } from '@element-plus/icons-vue'
import { usedeptDataStore } from '@/stores/modules/deptData.store'
const searcherDept = ref()
const options = [
  {
    label: '行政人事部',
    value: '行政人事部',
    children: [
      { label: '招聘组', value: '招聘组' },
      { label: '培训组', value: '培训组' },
      { label: '薪酬绩效组', value: '薪酬绩效组' },
    ],
  },
  {
    label: '财务部',
    value: '财务部',
    children: [
      { label: '会计组', value: '会计组' },
      { label: '成本控制组', value: '成本控制组' },
      { label: '出纳组', value: '出纳组' },
    ],
  },
  {
    label: '市场部',
    value: '市场部',
    children: [
      { label: '品牌推广组', value: '品牌推广组' },
      { label: '活动策划组', value: '活动策划组' },
      { label: '市场调研组', value: '市场调研组' },
    ],
  },
  {
    label: '销售部',
    value: '销售部',
    children: [
      { label: '大客户组', value: '大客户组' },
      { label: '渠道销售组', value: '渠道销售组' },
      { label: '售前支持组', value: '售前支持组' },
    ],
  },
  {
    label: '技术研发部',
    value: '技术研发部',
    children: [
      {
        label: '前端组',
        value: '前端组',
        children: [
          { label: 'Web前端', value: 'Web前端' },
          { label: '移动端', value: '移动端' },
        ],
      },
      {
        label: '后端组',
        value: '后端组',
        children: [
          { label: 'Java组', value: 'Java组' },
          { label: 'Node组', value: 'Node组' },
          { label: 'Python组', value: 'Python组' },
        ],
      },
      {
        label: '测试组',
        value: '测试组',
        children: [
          { label: '功能测试', value: '功能测试' },
          { label: '自动化测试', value: '自动化测试' },
          { label: '性能测试', value: '性能测试' },
        ],
      },
    ],
  },
  {
    label: '运维部',
    value: '运维部',
    children: [
      { label: '网络运维组', value: '网络运维组' },
      { label: '服务器运维组', value: '服务器运维组' },
      { label: '安全组', value: '安全组' },
    ],
  },
  {
    label: '产品部',
    value: '产品部',
    children: [
      { label: '产品经理组', value: '产品经理组' },
      { label: '交互设计组', value: '交互设计组' },
      { label: 'UI设计组', value: 'UI设计组' },
    ],
  },
  {
    label: '客服中心',
    value: '客服中心',
    children: [
      { label: '售后支持组', value: '售后支持组' },
      { label: '热线客服组', value: '热线客服组' },
      { label: '客户关怀组', value: '客户关怀组' },
    ],
  },
]
const deptDataStore = usedeptDataStore()
</script>
<template>
  <div class="deptheader block">
    <div class="sortstaff">
      <el-input
        v-model="searcherDept"
        style="width: 200px"
        placeholder="搜索[部门命称/组/负责人]"
      />
      <el-cascader v-model="searcherDept" :options="options" />
    </div>
    <div class="addstaff">
      <el-button
        type="primary"
        class="button"
        @click="deptDataStore.openShowMask({ type: 'add', data: {} })"
      >
        <el-icon><Plus /></el-icon>添加部门</el-button
      >
      <el-button class="button">
        <el-icon><Upload /></el-icon>导出数据</el-button
      >
      <el-button class="button">
        <el-icon><Download /></el-icon>批量导入</el-button
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.el-input {
  :deep(.el-input__wrapper) {
    border-radius: 0;
    border-radius: 20px 0 0 20px;
    box-shadow: none !important; /* 去掉 Element Plus 默认边框 */
    border-top: 1px solid var(--el-border-color);
    border-left: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    border-right: none !important; /* 只去掉左边 */
  }
}

.block {
  margin-bottom: 24px;
}
$cardBgc: #fff;
.deptheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: 60px;
  border-radius: 16px;
  background-color: $cardBgc;
  .addstaff {
    display: flex;
    .button {
      height: 40px;
      width: 100%;
    }
  }
  .sortstaff {
    display: flex;

    :deep(.el-input__wrapper) {
      height: 40px !important;
    }
  }
}
</style>
