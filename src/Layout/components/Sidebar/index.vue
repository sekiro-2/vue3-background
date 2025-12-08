<script setup>
import SidebarLogo from './components/SidebarLogo.vue'
import SidebarMenu from './components/SidebarMenu.vue'
import { useAppStore, useRouterStore } from '@/stores'
const appStore = useAppStore()
const routerStore = useRouterStore()
</script>

<template>
  <SidebarLogo :toggle="appStore.sideBarStare" v-if="appStore.logoShow"></SidebarLogo>
  <el-scrollbar>
    <SidebarMenu :data="routerStore.router" :toggle="appStore.sideBarStare"></SidebarMenu>
  </el-scrollbar>
</template>
<style scoped>
.el-scrollbar {
  height: calc(100vh - 50px) !important;
}
</style>
