<script setup>
const props = defineProps({
  icon: String,
})

const componentIcon = props?.icon?.endsWith('Icon')
</script>

<template>
  <template v-if="icon">
    <template v-if="componentIcon">
      <el-icon :size="14"><component :is="icon"></component> </el-icon
    ></template>
    <template v-else>
      <div :class="`i-svg:${icon}`" class="Svgicon"></div>
    </template>
  </template>
  <!-- 默认图标 -->
  <template v-else>
    <div :class="`i-svg:element-plus`" class="Svgicon"></div>
  </template>
</template>
<style>
.Svgicon,
.el-icon {
  width: 24px;
  height: 16px;
  margin-right: 4px;
}
</style>
