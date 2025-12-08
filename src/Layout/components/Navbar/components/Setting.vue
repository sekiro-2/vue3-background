<script setup>
import { ref } from 'vue'
import ThemeAside from '@/components/SettingItem/themeAside.vue'
import OtherSetting from '@/components/SettingItem/otherSetting.vue'

const toggle = ref(false)
const showMask = () => {
  toggle.value = !toggle.value
}
</script>

<template>
  <div :class="['i-svg:setting', 'setting']" @click="showMask"></div>

  <div v-show="toggle" class="modal-mask" @click.self="showMask">
    <div class="content animate__animated animate__fadeInRight">
      <h3 class="title">系统设置</h3>
      <div class="theme-box">
        <ThemeAside></ThemeAside>
        <OtherSetting></OtherSetting>
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
  z-index: 9999;
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
}
</style>
