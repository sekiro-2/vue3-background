<script setup>
import Sidebar from '@/Layout/components/Sidebar/index.vue'
</script>

<template>
  <div class="layout">
    <aside class="layout_aside">
      <div class="logo">logo</div>
      <div class="menu">
        <Sidebar></Sidebar>
      </div>
    </aside>

    <div class="layout_container">
      <header class="layout_header">头部</header>
      <nav class="layout_nav">标签区域</nav>
      <main class="layout_main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<style scoped lang="scss">
$aisdeWidth: 220px;
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  .layout_aside {
    height: 100vh;
    width: $aisdeWidth;
    background: #fff;
    .logo {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #666;
    }
  }
  .layout_container {
    width: calc(100vw - $aisdeWidth);
    .layout_header {
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
    }
    .layout_nav {
      height: 30px;
      border: 1px solid #e5e5e5;
    }
    .layout_main {
      padding: 20px;
      background: #f2f3f5;
    }
  }
}
</style>
