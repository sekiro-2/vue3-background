<script setup>
const props = defineProps({
  icon: Object,
})
</script>

<template>
  <el-icon :size="14">
    <component :is="props.icon"></component>
  </el-icon>
</template>
