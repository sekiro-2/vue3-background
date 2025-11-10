<script setup>
import { ref, watch, computed, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Avatar, ElementPlus, HomeFilled, Wallet, Setting } from '@element-plus/icons-vue'

const props = defineProps({
  isCollapse: Boolean,
})
const emit = defineEmits(['tags'])
// 路由跳转,报保持一样的激活状态
const router = useRouter()
const route = useRoute()
const tags = reactive([])
let tagsIndex = ''
let tagsText = ''

const handleMenuSelect = (index) => {
  tagsIndex = index
  switch (tagsIndex) {
    case '/home/org':
      tagsText = '组织'
      break
    case '/home/customer':
      tagsText = '员工'
      break
    case '/home/org':
      tagsText = '组织'
      break
    case '/home/monery':
      tagsText = '工资'
      break
    case '/home/setting':
      tagsText = '设置'
      break
  }
  router.push(`${index}`)
  const exist = tags.some((tag) => tag.route === tagsIndex)
  if (!exist) {
    tags.push({
      name: tagsText,
      route: tagsIndex,
    })
    emit('tags', tags)
  }
}

const activeIndex = computed(() => route.path)
// onMounted(() => {
//   const tabs = document.querySelectorAll('.el-menu-item span')
//   console.log(tabs[1].innerText)
// })
</script>

<template>
  <div :class="['menu', { collapse: isCollapse }]">
    <h5 :class="['title', { font: isCollapse }]">后台管理系统</h5>
    <el-menu
      class="nav-menu"
      @select="handleMenuSelect"
      background-color="#112135"
      text-color="#fff"
      :collapse="isCollapse"
      :default-active="activeIndex"
    >
      <el-menu-item index="/home/dashboard">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/home/org">
        <el-icon><ElementPlus /></el-icon>
        <span>组织</span>
      </el-menu-item>

      <el-menu-item index="/home/customer">
        <el-icon><Avatar /></el-icon>
        <span>员工</span>
      </el-menu-item>

      <el-menu-item index="/home/monery">
        <el-icon><Wallet /></el-icon>
        <span>工资</span>
      </el-menu-item>
      <el-menu-item index="/home/setting">
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss">
.menu {
  transition: width 0.3s ease; /* 关键：过渡动画 */
  background: #112135;
  width: 13vw;
  &.collapse {
    width: 64px;
  }
  &.rebound {
    width: 13vw;
  }
  .title {
    transition: all 0.3s ease; /* 关键：过渡动画 */
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    &.font {
      transition: all 0.3s ease; /* 关键：过渡动画 */
      font-size: 0;
    }
  }
  .nav-menu {
    transition: width 0.3s ease; /* 关键：过渡动画 */
    border: 0;
    font-size: 20px;
    .is-active {
      // background: rgb(131, 131, 138);
    }
    &.collapse {
      transition: width 0.3s ease; /* 关键：过渡动画 */
      width: 4vw;
    }
  }
}
</style>
