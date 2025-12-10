<script setup>
import { onMounted, ref } from 'vue'
import Scrollcard from '@/components/Scrollcard/index.vue'
import Myechart from '@/components/Myechart/index.vue'
import { getTodayDate } from '@/utils'
import CardItem from './components/CardItem.vue'
import * as echarts from 'echarts'
import { lineOption, pieOption, treeOption, radarOption } from '@/utils/index'
const date = getTodayDate()
</script>

<template>
  <div class="header">
    <h2>欢迎使用后台企业管理系统!</h2>
    <span class="text-[#666]">今天是 {{ date }}，以下公司情况</span>
  </div>

  <div class="dashboard">
    <!-- 左侧卡片区 -->
    <div class="left">
      <CardItem></CardItem>
    </div>

    <!-- 右侧 Todo 区 -->
    <div class="right">
      <h3 class="mb-[20px]">通知公告</h3>
      <Scrollcard :notices="announcements" :speed="5" />
    </div>
  </div>
  <div class="show">
    <div class="chart"><Myechart :option="pieOption"></Myechart></div>
    <div class="chart"><Myechart :option="treeOption"></Myechart></div>
    <div class="chart"><Myechart :option="lineOption"></Myechart></div>
    <div class="chart"><Myechart :option="radarOption"></Myechart></div>
  </div>
</template>

<style scoped lang="scss">
.show {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  @media (max-width: 1224px) {
    grid-template-columns: 1fr;
  }
  .chart {
    background: #fff;
    height: 500px;
  }
}

.header {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
}

// 整体布局
.dashboard {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 1224px) {
    grid-template-columns: 1fr;
  }

  .left {
    display: flex;
    flex-direction: column;
  }

  .right {
    background: #fff;
    padding: 20px;
    border-radius: 16px;
    // min-height: 800px; // 保证右边比左边高
  }
}
</style>
