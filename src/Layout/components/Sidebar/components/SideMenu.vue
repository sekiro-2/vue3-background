<script setup>
import { useAppStore } from '@/stores'
import { computed } from 'vue'
const appStore = useAppStore()
</script>

<template>
  <el-menu :collapse="appStore.sideBarStare" :unique-opened="false" :collapse-transition="false">
    <el-menu-item>1</el-menu-item>
    <el-menu-item>1</el-menu-item>
    <el-menu-item>1</el-menu-item>
    <el-menu-item>1</el-menu-item>
  </el-menu>
</template>
