<script setup>
import { ref } from 'vue'
import CountUp from 'vue-countup-v3'
import AnimatedFlipNumber from '@/components/Scrollcard/index.vue'

const value = ref(12345)
</script>

<template>
  员工展示页

  <div class="grid">
    <div class="bg-[#ccc]">1</div>
    <div class="bg-[#ccc]">2</div>
    <div class="bg-[#ccc]">3</div>
    <div class="bg-[#ccc]">1</div>
  </div>
  <CountUp endVal="5000" :duration="2" :options="{ separator: ',' }" />

  <div class="grid-container">
    <div class="left">左边内容</div>
    <div class="right">右边内容</div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.grid-container {
  display: grid;
  grid-template-columns: 2fr 3fr; /* 左列占2份，右列占3份 */
  gap: 16px;
}

.left {
  background-color: #409eff;
  color: #fff;
  height: 200px; /* 左列高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.right {
  background-color: #67c23a;
  color: #fff;
  height: 300px; /* 右列高度更高 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
