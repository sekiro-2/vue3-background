<script setup>
import { useAppStore } from '@/stores'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
const appStore = useAppStore()
const toggle = () => {
  appStore.toggleSideBar()
}
</script>

<template>
  <div class="navbar">
    <div class="navbar__left">
      <!-- 展开/收缩菜单  -->
      <div class="toggle">
        <div
          :class="['i-svg:toggle', { fold: appStore.sideBarStare }, 'icon']"
          @click="toggle"
        ></div>
      </div>
      <!-- 面包屑 -->
      <Breadcrumb />
    </div>
    <!-- 导航栏右侧 -->
    <!-- <NavbarRight /> -->
  </div>
</template>
<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: var(--el-bg-color);

  &__left {
    display: flex;
    align-items: center;
  }
}

.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  .icon {
    transition: all 0.3s ease;
    width: 20px;
    height: 20px;
  }
  .fold {
    transform: scaleX(-1);
  }
}
</style>
