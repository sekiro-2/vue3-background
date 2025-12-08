<script setup>
import { useRouterStore } from '@/stores'
const useRouter = useRouterStore()
function getTodayDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const week = weekDays[date.getDay()]

  return `${year}年${month}月${day}日 ${week}`
}
const date = getTodayDate()
</script>

<template>
  <div class="header block">
    <h2>欢迎使用后台企业管理系统!</h2>
    <span class="text-#666">今天是 {{ date }}，以下公司情况</span>
  </div>
  <div class="nav block">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
  </div>
</template>

<style scoped lang="scss">
.block {
  margin-bottom: 30px;
}

.header {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}
.nav {
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  .card {
    width: 300px;
    height: 150px;
    border-radius: 20px;
    background: pink;
  }
}
</style>
