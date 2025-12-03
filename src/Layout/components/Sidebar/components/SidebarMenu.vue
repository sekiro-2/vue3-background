<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
const props = defineProps({
  toggle: Boolean,
  data: Array,
})
</script>

<template>
  <el-menu
    :default-active="$route.path"
    :collapse="props.toggle"
    :unique-opened="false"
    :collapse-transition="false"
    router
  >
    <SidebarMenuItem v-for="data in props.data" :key="data.path" :item="data"></SidebarMenuItem>
  </el-menu>
</template>
