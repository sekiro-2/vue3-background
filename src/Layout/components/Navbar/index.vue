<script setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Toggle from './components/Toggle.vue'
import User from './components/User.vue'
</script>

<template>
  <div class="navbar">
    <div class="navbar__left">
      <!-- 展开/收缩菜单  -->
      <Toggle></Toggle>
      <!-- 面包屑 -->
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 导航栏右侧 -->
    <div class="navbar__right">
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

  &__left {
    display: flex;
    align-items: center;
  }
  &__right {
    display: flex;
  }
}
</style>
