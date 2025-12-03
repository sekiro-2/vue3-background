<script setup>
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const toggle = () => {
  appStore.toggleSideBar()
}
</script>

<template>
  <el-button @click="toggle">123</el-button>
</template>
