<script setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Toggle from './components/Toggle.vue'
import User from './components/User.vue'
import Fullscreen from '@/components/Fullscreen/index.vue'
import Setting from './components/Setting.vue'
import Gitee from './components/Gitee.vue'
</script>

<template>
  <div class="navbar">
    <div class="navbar__left">
      <!-- 展开/收缩菜单  -->
      <Toggle></Toggle>
      <!-- 面包屑 -->
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 导航栏功能右侧区域 -->
    <div class="navbar__right">
      <!-- 全屏 -->
      <Fullscreen></Fullscreen>
      <!-- 系统设置 -->
      <Setting></Setting>
      <!-- gitee -->
      <gitee></gitee>
      <!-- 用户中心 -->
      <User></User>
    </div>
  </div>
</template>
<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  .navbar__left {
    display: flex;
    align-items: center;
  }
  .navbar__right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
  }
}
</style>
