<script setup>
import { useAppStore } from '@/stores'
import { color } from 'echarts'
import { ref } from 'vue'

const appStore = useAppStore()
const activeIndex = ref(0)
const chnageThemeColor = (index, color) => {
  activeIndex.value = index
  appStore.changeTagsViewBgc(color)
}

const themeColor = [
  { name: '深空蓝', color: '#409eff' },
  { name: '雾霾蓝', color: '#4C6E91' },
  { name: '静谧绿', color: '#2BAE66' },
  { name: '商务橙', color: '#FF9F43' },
  { name: '危机红', color: '#D63031' },
  { name: '科技紫', color: '#6C5CE7' },
  { name: '浅灰底', color: '#F4F6F8' },
]
</script>

<template>
  <div class="pb-[20px]">
    <h4 class="pb-[10px]">主题设置</h4>
    <div class="block">
      <el-tooltip
        effect="dark"
        :content="item.name"
        placement="top"
        v-for="(item, index) in themeColor"
        :key="index"
      >
        <div
          class="themecolor"
          @click="chnageThemeColor(index, item.color)"
          :style="{ backgroundColor: item.color }"
        >
          <div v-if="activeIndex === index" class="i-svg:checkout checkouticon"></div>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
.themecolor {
  border-radius: 4px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 23px;
  cursor: pointer;
}
.block {
  display: flex;
  justify-content: space-around;
  color: #000;
  padding-right: 50px;
  width: 100%;
}
</style>
