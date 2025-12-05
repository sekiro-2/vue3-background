<template>
  <div class="error">
    <img src="@/assets/Error/404.png" alt="" />
    <el-button class="button" type="success" round @click="$router.push('/dashboard')"
      >返回首页</el-button
    >
  </div>
</template>
<style scoped lang="scss">
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    max-width: 100%;
    height: auto;
    overflow: hidden;
  }
  .button {
    margin-top: 50px;
    width: 150px;
    height: 40px;
    transform: translateX(-50%);
  }
}
</style>
