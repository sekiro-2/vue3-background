<script setup>
import { useAppStore } from '@/stores'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
const appStore = useAppStore()
const toggle = () => {
  appStore.toggleSideBar()
}
</script>
<template>
  <div class="toggle">
    <div :class="['i-svg:toggle', { fold: appStore.sideBarStare }, 'icon']" @click="toggle"></div>
  </div>
</template>

<style scoped lang="scss">
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
