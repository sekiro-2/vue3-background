<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
import { useAppStore } from '@/stores'
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
    :background-color="useAppStore().themeBackgroundColor"
    :text-color="useAppStore().themeTextColor"
    router
  >
    <SidebarMenuItem
      v-for="data in props.data"
      :key="data.path"
      :item="data"
      :collapse="props.toggle"
    ></SidebarMenuItem>
  </el-menu>
</template>
