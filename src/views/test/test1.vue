<script setup>
import { onMounted, ref, watch } from 'vue'

const value2 = ref(0)
const box = ref()
const eyes1 = ref()
const eyes2 = ref()

onMounted(() => {
  watch(
    () => value2.value,
    () => {
      box.value.style.animationDelay = -value2.value + 's'
      eyes1.value.style.animationDelay = -value2.value + 's'
      eyes2.value.style.animationDelay = -value2.value + 's'
    },
  )
})
</script>

<template>
  <div class="h-500px w-full flex justify-center items-center flex-col">
    <div
      class="w200px h-200px rounded-full bg-#fff text-center leading-50px relative box"
      ref="box"
    >
      <div
        class="w-30px h-30px rounded-full bg-#fff absolute left-50px bottom-100px eyes1"
        ref="eyes1"
      ></div>
      <div
        class="w-30px h-30px rounded-full bg-#fff absolute left-120px bottom-100px eyes2"
        ref="eyes2"
      ></div>
      <div class="w-85px h-50px bg-#fff absolute left-60px bottom-6px eyes3" ref="eyes3"></div>
    </div>
    <div class="w-300px mt-20px">
      <el-slider v-model="value2" :min="0" :max="1" :step="0.01" />
    </div>
  </div>
  <div class="mouth"></div>
</template>

<style scoped lang="scss">
.eyes3 {
  clip-path: ellipse(34% 28% at 50% 0%);
}
.mouth {
  width: 60px;
  height: 18px;
  background: #000;
  border-radius: 12px;
}

.test:hover {
  clip-path: ellipse(50% 35% at 50% 65%);
}
.box {
  animation: move 1s linear forwards paused;
  flex-direction: column;
}
.eyes1 {
  animation: eyes1 1s linear forwards paused;
}
.eyes2 {
  animation: eyes2 1s linear forwards paused;
}
@keyframes eyes1 {
  0% {
    clip-path: polygon(0 60%, 100% 0, 100% 100%, 0% 100%); /* 生气 */
  }

  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
@keyframes eyes2 {
  0% {
    clip-path: polygon(0 0, 100% 60%, 100% 100%, 0% 100%);
  }

  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
@keyframes move {
  0% {
    background-color: rgb(255, 60, 60); /* 生气 */
  }
  50% {
    background-color: rgb(255, 200, 0); /* 缓和 */
  }
  100% {
    background-color: rgb(60, 200, 120); /* 高兴 */
  }
}
</style>
