<script setup>
import { computed, watchEffect } from 'vue'
import Sidebar from '@/Layout/components/Sidebar/index.vue'
import Navbar from '@/Layout/components/Navbar/index.vue'
import TagsView from '@/Layout/components/TagsView/index.vue'
import { useAppStore } from '@/stores'
import { useWindowSize } from '@vueuse/core'
const appStore = useAppStore()
const toggle = computed(() => appStore.sideBarStare)
const width = useWindowSize().width
// 监听窗口宽度变化，调整设备类型和侧边栏状态
watchEffect(() => {
  const isDesktop = width.value >= 992
  if (isDesktop) {
    appStore.openSideBar()
  } else {
    appStore.closeSideBar()
  }
})
</script>

<template>
  <div class="layout">
    <aside
      class="layout_aside"
      :class="{ collapse: toggle }"
      :style="{ background: appStore.themeBackgroundColor }"
    >
      <Sidebar></Sidebar>
    </aside>
    <div class="layout_container">
      <header class="layout_header"><Navbar></Navbar></header>
      <nav class="layout_nav" v-if="appStore.tagsViewShow"><TagsView></TagsView></nav>

      <main class="layout_main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<style scoped lang="scss">
$aisdeWidth: 280px;
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
      height: 40px;
      border: 1px solid #e5e5e5;
    }
    .layout_main {
      height: calc(100vh - 90px);
      padding: 20px;
      background: #f2f3f5;
      overflow: auto;
    }
  }
}
</style>
