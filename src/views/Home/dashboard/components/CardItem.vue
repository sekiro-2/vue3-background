<script setup>
import CountUp from 'vue-countup-v3'
const orgCount = {
  allPeople: { title: '企业总人数', num: 5222 },
  formalStaff: { title: '正式员工', num: 4164 },
  contractPending: { title: '合同待签署', num: 2323 },
  toJoin: { title: '待入职', num: 252 },
  toRegularizeThisMonth: { title: '本月待转正', num: 112 },
  toResignThisMonth: { title: '本月待离职', num: 137 },
}

const quickLink = [
  {
    path: '/org/employee',
    title: '员工管理',
    icon: 'employee',
    color: '#409eff',
    bgColor: '#e6f0ff',
  },
  {
    path: '/org/dept',
    title: '部门管理',
    icon: 'department',
    color: '#67c23a',
    bgColor: '#f0f9eb',
  },
  { path: '/org/post', title: '岗位管理', icon: 'position', color: '#f56c6c', bgColor: '#fef0f0' },
  {
    path: '/org/role',
    title: '角色与权限',
    icon: 'permission',
    color: '#e6a23c',
    bgColor: '#fdf6ec',
  },
]
</script>

<template>
  <div class="card-grid">
    <div class="card" v-for="(item, index) in orgCount" :key="index">
      <div class="card-header">
        <div>
          <p class="card-title-small">{{ item.title }}</p>
          <CountUp
            :endVal="item.num"
            :duration="2"
            :options="{ separator: ',' }"
            class="card-value"
          />
        </div>
        <div class="icon-box primary-bg">
          <i class="fa fa-briefcase"></i>
        </div>
      </div>
      <div class="card-footer success">
        <span>8.2% 较上月</span>
      </div>
    </div>

    <!-- 底部独占行 -->
    <div class="full-width">
      <div class="title">快捷入口</div>

      <div class="links">
        <div class="link" v-for="n in quickLink" :key="n.path">
          <router-link :to="n.path">
            <div :class="[`i-svg:${n.icon}`, 'text-20px']" :style="{ color: n.color }"></div>
          </router-link>
          <span>{{ n.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1224px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .full-width {
    background: #fff;
    border-radius: 15px;
    padding: 16px 20px;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    grid-column: 1 / -1;
    .title {
      font-size: 18px;
      font-weight: 500;
    }

    .links {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .link {
      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        width: 50px;
        height: 50px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        margin-bottom: 5px;
        display: block;
        &:hover {
          background: #e6f0ff;
        }
      }

      span {
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
// 卡片样式
.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;

    .card-title-small {
      color: #6b7280;
      font-size: 16px;
    }

    .card-value {
      margin-top: 4px;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .card-footer {
    font-size: 14px;
    &.success {
      color: #16a34a;
    }
    &.danger {
      color: #dc2626;
    }
  }
}
</style>
