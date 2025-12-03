<script setup>
import { computed } from 'vue'
import SidebarLogo from './components/SidebarLogo.vue'
import SideMenu from './components/SideMenu.vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const toggle = computed(() => appStore.sideBarStare)
</script>

<template>
  <SidebarLogo :toggle="toggle"></SidebarLogo>
  <SideMenu></SideMenu>
</template>
