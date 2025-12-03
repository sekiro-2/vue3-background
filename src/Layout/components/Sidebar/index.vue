<script setup>
import SidebarLogo from './components/SidebarLogo.vue'
import SidebarMenu from './components/SidebarMenu.vue'
import { useAppStore, useRouterStore } from '@/stores'
const appStore = useAppStore()
const routerStore = useRouterStore()
</script>

<template>
  <SidebarLogo :toggle="appStore.sideBarStare"></SidebarLogo>
  <el-scrollbar>
    <SidebarMenu :data="routerStore.router" :toggle="appStore.sideBarStare"></SidebarMenu>
  </el-scrollbar>
</template>
