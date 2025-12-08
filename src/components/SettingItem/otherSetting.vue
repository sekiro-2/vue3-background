<script setup>
import { useAppStore } from '@/stores'
import { ref } from 'vue'

const appStore = useAppStore()
const value2 = ref(true)
</script>

<template>
  <div class="pb-[20px]">
    <h4 class="pb-[10px]">其他设置</h4>
    <div class="block">
      <span>显示logo</span>
      <el-switch
        v-model="appStore.logoShow"
        class="ml-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      />
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  justify-content: space-between;
  color: #000;
  padding-right: 50px;
  width: 100%;
}
</style>
