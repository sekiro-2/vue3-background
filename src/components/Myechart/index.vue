<template>
  <div class="chart" ref="wrapperRef">
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: Object,
})

const chartRef = ref(null)
const wrapperRef = ref(null)
let chart = null
let ro = null

const initChart = () => {
  if (!chartRef.value) return

  if (chart) chart.dispose()

  chart = echarts.init(chartRef.value)
  chart.setOption(props.option || {})
}

watch(
  () => props.option,
  (newOption) => {
    if (chart && newOption) {
      chart.setOption(newOption, true)
    }
  },
  { deep: true },
)

onMounted(async () => {
  await nextTick()
  initChart()

  // 监听真正的父容器变化（最关键）
  ro = new ResizeObserver(() => {
    chart?.resize()
  })
  ro.observe(wrapperRef.value)

  // 浏览器 Resize
  window.addEventListener('resize', chart.resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', chart.resize)
  ro && ro.disconnect()
  chart && chart.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  min-height: 200px; /* 防止高度为0 */
}

.chart-content {
  width: 100%;
  height: 100%;
}
</style>
