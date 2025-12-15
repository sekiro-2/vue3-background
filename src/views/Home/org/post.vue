<template>
  <div ref="tagRef" class="tags">
    <div v-for="tag in tags" :key="tag.fullPath" class="tagview">
      {{ tag.title }}
    </div>
  </div>
</template>

<script setup>
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'

const tagRef = ref()
const tags = [
  {
    name: 'Dashboard',
    fullPath: '/dashboard',
    title: '首页',
    affix: true,
    keepAlive: true,
  },
  {
    name: 'Dept',
    fullPath: '/org/dept',
    title: '部门管理',
    keepAlive: true,
  },
  {
    name: 'Employee',
    fullPath: '/org/employee',
    title: '员工管理',
    keepAlive: true,
  },
  {
    name: 'Post',
    fullPath: '/org/post',
    title: '岗位管理',
  },
  {
    name: 'Role',
    fullPath: '/org/role',
    title: '角色与权限',
  },
]
onMounted(() => {
  Sortable.create(tagRef.value, {
    animation: 150,
    ghostClass: 'ghost',
    onEnd({ oldIndex, newIndex }) {
      const moved = tags.splice(oldIndex, 1)[0]
      tags.splice(newIndex, 0, moved)
    },
  })
})
</script>

<style scoped>
.ghost {
  opacity: 0.4;
}
</style>
