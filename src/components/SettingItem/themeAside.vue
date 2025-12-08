<script setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const them1 = {
  backgroudColor: '#181f31',
  textColor: '#fff',
  index: '1',
}
const them2 = {
  backgroudColor: '#fff',
  textColor: '#000',
  index: '2',
}

const changColor = (value) => {
  appStore.changeThemeColor(value)
}
</script>

<template>
  <div class="pb-[20px]">
    <h4 class="pb-[10px]">整体风格设置</h4>
    <div class="themsetting">
      <el-popover content="默认主题" placement="top" effect="dark">
        <template #reference>
          <div class="them1" @click="[changColor(them1)]">
            <div class="w-[15px]">
              <div class="bg-[#064696] h-[10px] rounded-tl-lg"></div>
              <div class="bg-[#000] h-[40px] rounded-bl-lg"></div>
            </div>
            <div class="w-[35px]">
              <div class="bg-[#fff] h-[10px] rounded-tr-lg"></div>
              <div class="bg-[#e3e4e5] h-[40px] rounded-br-lg">
                <div v-if="appStore.themeIndex === '1'" class="i-svg:checkout checkouticon"></div>
              </div>
            </div>
          </div>
        </template>
      </el-popover>

      <el-popover content="亮色主题" placement="top" effect="dark">
        <template #reference>
          <div class="them1" @click="[changColor(them2)]">
            <div class="w-[15px]">
              <div class="bg-[#064696] h-[10px] rounded-tl-lg"></div>
              <div class="bg-[#fff] h-[40px] rounded-bl-lg"></div>
            </div>
            <div class="w-[35px]">
              <div class="bg-[#fff] h-[10px] rounded-tr-lg"></div>
              <div class="bg-[#e3e4e5] h-[40px] rounded-br-lg">
                <div v-if="appStore.themeIndex === '2'" class="i-svg:checkout checkouticon"></div>
              </div>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<style scoped>
.checkouticon {
  width: 35px;
  height: 40px;
}
.themsetting {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .them1 {
    cursor: pointer;
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin: 6px;
  }
}
</style>
