<script setup>
import { useAppStore } from '@/stores'
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
