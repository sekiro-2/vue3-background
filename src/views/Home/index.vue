<script setup>
import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import Menu from '@/components/Layout/menu.vue'

const isCollapse = ref(false)
const toggle = () => {
  isCollapse.value = !isCollapse.value
}
const tags = ref({})
const selectTag = (e) => {
  const el = e.target
  console.log(el)
}
const creatTags = (value) => {
  tags.value = value
  console.log('value', value)
}
const deleteTag = () => {
  console.log(1)
}
</script>
<template>
  <div class="full">
    <div class="menu">
      <Menu :isCollapse="isCollapse" @tags="creatTags"></Menu>
    </div>
    <div class="main">
      <div class="header">
        <div class="top">
          <i
            :class="[{ 'fold-icon': !isCollapse }, { 'expand-icon': isCollapse }]"
            @click="toggle"
          ></i>

          <el-button>退出登录</el-button>
        </div>
        <div class="bottom" @click="selectTag">
          <span data-key="/home/dashboard">首页</span>
          <span v-for="value in tags" :data-key="value.route"
            >{{ value.name }} <el-icon :size="12" @click="deleteTag"><Delete></Delete></el-icon
          ></span>
        </div>
      </div>
      <div class="main-contain">
        <div><router-view></router-view></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.full {
  display: flex;
  width: 100vw;
  .menu {
    height: 100vh;
  }
  .main {
    width: 100%;
    .header {
      height: 100px;
      background: #fff;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #333;
        .fold-icon {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: url('@/assets/image/fold.svg') no-repeat;
          background-position: center;
          background-size: 60%; /* 按元素的 80% 大小缩放 */
          &:hover {
            transform: scale(0.9);
          }
        }
        .expand-icon {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: url('@/assets/image/展开.svg') no-repeat;
          background-position: center;
          background-size: 50%; /* 按元素的 80% 大小缩放 */
          &:hover {
            transform: scale(0.9);
          }
        }
      }
      .bottom {
        height: 40px;
        display: flex;
        align-items: center;
        span {
          box-sizing: border-box;
          padding: 2px 5px;
          margin-left: 15px;
          border-radius: 4px;
          background: rgb(234, 231, 232);
          cursor: pointer;
        }
      }
    }
    .main-contain {
      background: #fff;
      height: 800px;
      margin: 30px 20px 20px 30px;
    }
  }
}
</style>
