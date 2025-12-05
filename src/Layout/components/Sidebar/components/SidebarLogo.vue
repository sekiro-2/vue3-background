<script setup>
const props = defineProps({
  toggle: Boolean,
})
</script>
<template>
  <div class="logo" :class="{ collapse: toggle }">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <router-link :key="+toggle" to="/dashboard">
        <img src="@/assets/logo.png" alt="" />
        <span v-if="!toggle" class="title">后台企业管理系统</span>
      </router-link>
    </transition>
  </div>
</template>

<style scoped>
.collapse {
  width: 63px !important;
}
.logo {
  width: 100%;
  height: 50px;
  background-color: #064696;
  transition: all 0.3s;

  a {
    display: flex;
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;

    img {
      height: 32px;
      margin-right: 5px;
    }
    .title {
      color: #fff;
    }
  }
}
</style>
