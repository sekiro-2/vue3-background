<script setup>
import { onMounted, ref } from 'vue'
const toggle = ref(false)
const showMask = () => {
  toggle.value = !toggle.value
}
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const color = ref('')
color.value = appStore.themeColor
const changColor = (color) => {
  appStore.changeThemeColor(color)
}
</script>

<template>
  <div :class="['i-svg:setting', 'setting']" @click="showMask"></div>

  <div v-show="toggle" class="modal-mask" @click.self="showMask">
    <div class="content animate__animated animate__fadeInRight">
      <h3 class="title">系统设置</h3>
      <div class="theme-box">
        <h4>整体风格设置</h4>
        <!-- <input type="color" v-model="color" @change="changColor(color)" />
        <el-button @click="changColor('#fff')">变化2</el-button> -->
        <div class="flex">
          <div class="them1" @click="changColor('#000')">
            <div class="w-[15px]">
              <div class="bg-[#064696] h-[10px] rounded-tl-lg"></div>
              <div class="bg-[#000] h-[40px] rounded-bl-lg"></div>
            </div>
            <div class="w-[35px]">
              <div class="bg-[#fff] h-[10px] rounded-tr-lg"></div>
              <div class="bg-[#e3e4e5] h-[40px] rounded-br-lg"></div>
            </div>
          </div>
          <div class="them1" @click="changColor('#fff')">
            <div class="w-[15px]">
              <div class="bg-[#064696] h-[10px] rounded-tl-lg"></div>
              <div class="bg-[#fff] h-[40px] rounded-bl-lg"></div>
            </div>
            <div class="w-[35px]">
              <div class="bg-[#fff] h-[10px] rounded-tr-lg"></div>
              <div class="bg-[#e3e4e5] h-[40px] rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.setting {
  width: 22px;
  height: 22px;
  margin: 0 12px;
  cursor: pointer;
  //图标会被flex压缩到自己原大小，加这个或外面套一个盒子
  flex: none;
}
.modal-mask {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 99999;
  justify-content: right;
  background: rgba(0, 0, 0, 0.4);
  .content {
    width: 300px;
    height: 100vh;
    // 覆盖animated的响应速度
    animation-duration: 0.5s !important;
    background: #f8f7f7;
    .title {
      text-align: center;
      line-height: 40px;
      margin-bottom: 30px;
      color: #333;
    }
  }
}
.theme-box {
  padding-left: 20px;
  height: 200px;

  color: #666;
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
