<template>
  <div @click="toggle" class="fullscreen">
    <div :class="`i-svg:` + (isFullscreen ? 'fullscreen-exit' : 'fullscreen')" />
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
.fullscreen {
  margin-right: 8px;
}
</style>
