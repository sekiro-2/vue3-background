<script setup>
import Sidebar from '@/Layout/components/Sidebar/index.vue'
import Navbar from '@/Layout/components/Navbar/index.vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
const toggle = computed(() => appStore.sideBarStare)
</script>

<template>
  <div class="layout">
    <aside class="layout_aside" :class="{ collapse: toggle }">
      <Sidebar></Sidebar>
    </aside>

    <div class="layout_container">
      <header class="layout_header"><Navbar></Navbar></header>
      <nav class="layout_nav">标签区域</nav>
      <main class="layout_main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<style scoped lang="scss">
$aisdeWidth: 210px;
.collapse {
  width: 63px !important;
}
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  .layout_aside {
    height: 100vh;
    width: $aisdeWidth;
    background: #fff;
    transition: width 0.3s;
  }
  .layout_container {
    width: 100%;
    .layout_header {
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
    }
    .layout_nav {
      height: 30px;
      border: 1px solid #e5e5e5;
    }
    .layout_main {
      height: calc(100vh - 80px);
      padding: 20px;
      background: #f2f3f5;
    }
  }
}
</style>
