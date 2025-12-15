<script setup>
import { usedeptDataStore } from '@/stores/modules/deptData.store'
import { watch, watchEffect, computed, ref } from 'vue'
const deptDataStore = usedeptDataStore()

watch(
  () => deptDataStore.deptList,
  (val) => {},
  { immediate: true },
)
const data = [
  {
    label: '公司总部',
    children: [
      {
        label: '行政人事部',
        children: [{ label: '招聘组' }, { label: '培训组' }, { label: '薪酬绩效组' }],
      },
      {
        label: '财务部',
        children: [{ label: '会计组' }, { label: '成本控制组' }, { label: '出纳组' }],
      },
      {
        label: '市场部',
        children: [{ label: '品牌推广组' }, { label: '活动策划组' }, { label: '市场调研组' }],
      },
      {
        label: '销售部',
        children: [{ label: '大客户组' }, { label: '渠道销售组' }, { label: '售前支持组' }],
      },
      {
        label: '技术研发部',
        children: [
          {
            label: '前端组',
            children: [{ label: 'Web前端' }, { label: '移动端' }],
          },
          {
            label: '后端组',
            children: [{ label: 'Java组' }, { label: 'Node组' }, { label: 'Python组' }],
          },
          {
            label: '测试组',
            children: [{ label: '功能测试' }, { label: '自动化测试' }, { label: '性能测试' }],
          },
        ],
      },
      {
        label: '运维部',
        children: [{ label: '网络运维组' }, { label: '服务器运维组' }, { label: '安全组' }],
      },
      {
        label: '产品部',
        children: [{ label: '产品经理组' }, { label: '交互设计组' }, { label: 'UI设计组' }],
      },
      {
        label: '客服中心',
        children: [{ label: '售后支持组' }, { label: '热线客服组' }, { label: '客户关怀组' }],
      },
    ],
  },
]
function listToTree(list) {
  const map = new Map()
  const tree = []

  list.forEach((item) => {
    const { parentDept, dept } = item

    // 父节点
    if (!map.has(parentDept)) {
      map.set(parentDept, {
        label: parentDept,
        children: [],
      })
      tree.push(map.get(parentDept))
    }

    const parentNode = map.get(parentDept)

    // 子节点（防止重复）
    if (!parentNode.children.find((child) => child.label === dept)) {
      parentNode.children.push({
        label: dept,
        children: [],
      })
    }
  })

  return tree
}
const treeData = ref([])
watch(
  () => deptDataStore.deptList,
  (val) => {
    treeData.value = listToTree(val)
    // console.log(treeData.value)
  },
  { immediate: true },
)
</script>

<template>
  <div class="depttree">
    <el-tree accordion :default-expand-all="false" :data="data" />
  </div>
</template>
<style scoped lang="scss">
.depttree {
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  width: 300px;
  height: auto;
}
</style>
