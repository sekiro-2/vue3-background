<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  notices: {
    type: Array,
    default: () => [
      {
        id: 1,
        text: '新员工入职',
        info: '张三加入技术部，担任前端开发工程师',
        time: '2025-10-05 14:00',
      },
      {
        id: 2,
        text: '系统版本更新',
        info: '平台已升级至 v3.2.1，修复登录偶发失败问题',
        time: '2025-10-06 09:20',
      },
      {
        id: 3,
        text: '公司团建通知',
        info: '本季度团建定于 10 月 12 日举行，请相关部门做好准备',
        time: '2025-10-07 11:45',
      },
      {
        id: 4,
        text: '财务报销调整',
        info: '10 月起差旅补贴标准调整，详情请查看内部通知',
        time: '2025-10-08 08:30',
      },
      {
        id: 5,
        text: '安全培训',
        info: '下周一进行年度信息安全培训，全员必须参加',
        time: '2025-10-08 16:10',
      },
      {
        id: 6,
        text: '服务器维护',
        info: '10 月 10 日凌晨 1:00-3:00 服务器维护，期间系统将短暂不可用',
        time: '2025-10-09 13:55',
      },
      {
        id: 7,
        text: '项目立项',
        info: '智慧园区一期项目正式立项，各部门开始资源统筹',
        time: '2025-10-10 10:40',
      },
      {
        id: 8,
        text: '节日放假安排',
        info: '春节放假 10 天，请提前做好值班安排',
        time: '2025-10-11 09:00',
      },
      {
        id: 9,
        text: '绩效考核开启',
        info: '2025 年 Q4 绩效考核周期开启，请按时提交评估表',
        time: '2025-10-11 15:30',
      },
      {
        id: 10,
        text: '空间调整通知',
        info: '办公区即日起进行布局优化，请配合资产部调整工位',
        time: '2025-10-12 10:25',
      },
    ],
  },
  speed: {
    type: Number,
    default: 50, // px 每秒
  },
})

const wrapper = ref(null)
const scrollY = ref(0)

let height = 0
let running = true // 是否正在播放
// 动画关键id
let rafId = null // requestAnimationFrame ID

// 启动动画
const animate = () => {
  if (!running) return

  scrollY.value += props.speed / 60 // 每帧位移

  if (scrollY.value >= height) {
    scrollY.value = 0 // 无缝重置
  }

  rafId = requestAnimationFrame(animate)
}

// 鼠标悬停暂停
const pause = () => {
  running = false
  cancelAnimationFrame(rafId)
}

// 鼠标离开继续
const resume = () => {
  if (!running) {
    running = true
    animate()
  }
}

onMounted(async () => {
  await nextTick()
  height = wrapper.value.scrollHeight / 3 // 单份高度

  animate()
})

onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<template>
  <div class="notice-board" @mouseenter="pause" @mouseleave="resume">
    <div class="notice-wrapper" ref="wrapper" :style="{ transform: `translateY(-${scrollY}px)` }">
      <!-- 双倍渲染，实现无缝滚动 -->
      <div
        class="notice-item"
        v-for="(n, index) in [...notices, ...notices, ...notices]"
        :key="index"
      >
        <div class="i-svg:dog img"></div>
        <div class="info">
          <h4 class="text-[#333] text-16px">{{ n.text }}</h4>
          <span class="text-[#666] mb-2px mt-2px">{{ n.info }}</span>
          <span class="text-[#666]">{{ n.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  height: 50px;
}

.notice-board {
  width: 100%;
  height: 420px;
  overflow: hidden;
  background: #fff;
  position: relative;
  padding: 10px;
  cursor: pointer;
}

.notice-wrapper {
  display: flex;
  flex-direction: column;
  will-change: transform; // 性能优化
}

.notice-item {
  padding: 10px;
  padding-left: 6px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  display: flex;
  .img {
    margin-right: 20px;
    font-size: 24px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
}
</style>
