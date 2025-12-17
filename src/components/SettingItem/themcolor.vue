<script setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const chnageThemeColor = (index, color) => {
  appStore.changeTagsViewBgc(color, index)
}

const themeColor = [
  { name: '企业蓝', color: '#409eff' },
  { name: '警示红', color: '#d60f20' },
  { name: '科技紫', color: '#ac25e6' },
  { name: '商务橙', color: '#FF9F43' },
  { name: '生态绿', color: '#4dc86f' },
  { name: '冷静青', color: '#13c2c2' },
  { name: '深空灰', color: '#333333' },
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
          <div v-if="appStore.colorIndex === index" class="i-svg:checkout checkouticon"></div>
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
