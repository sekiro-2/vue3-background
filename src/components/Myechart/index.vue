<template>
  <div class="chart">
    <div ref="chartRef" />
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  option: Object,
})
const chartRef = ref()
let chart = null
function initChart(data) {
  chart = echarts.init(chartRef.value)
  if (props.option) {
    chart?.setOption(props.option)
  }
}

function resizeChart() {
  chart?.resize({})
}
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
})
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
  position: relative;

  > div {
    width: 100%;
    height: 100%;
  }
}
</style>
