<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
const props = defineProps({
  item: Object,
})
</script>

<template>
  <div v-if="!item.meta || !item.meta?.hidden">
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item?.meta?.hidden">{{
        item?.meta?.title
      }}</el-menu-item>
    </template>
    <el-sub-menu v-else :index="item.path">
      <template #title>{{ item?.meta?.title }}</template>
      <SidebarMenuItem v-for="child in item.children" :key="child.path" :item="child" />
    </el-sub-menu>
  </div>
</template>
