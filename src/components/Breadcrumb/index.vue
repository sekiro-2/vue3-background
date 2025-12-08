<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouteLocationMatched } from 'vue-router'

const route = useRoute()
const breadcrumbs = ref<Array<RouteLocationMatched>>([])

const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter((item) => item.meta && item.meta.title)
}

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <el-breadcrumb separator="/">
    <transition-group enter-active-class="animate__animated animate__fadeInRight">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <router-link :to="item.path" v-if="item.path !== $route.path">
          {{ item.meta.title }}</router-link
        >
        <span v-else> {{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
