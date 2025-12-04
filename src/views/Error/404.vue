<template>
  <img src="@/assets/Error/404.png" alt="" />
  <el-button class="button" type="success" round @click="$router.push('/dashboard')"
    >返回首页</el-button
  >
</template>
<style scoped lang="scss">
img {
  margin-left: 50%;
  margin-top: 50px;
  transform: translateX(-50%);
}
.button {
  width: 150px;
  height: 40px;
  margin-top: 50px;
  margin-left: 40%;
}
</style>
