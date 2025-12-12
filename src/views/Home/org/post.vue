<script setup></script>
<template>
  <div>
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
  /* width: fit-content; */
  height: 100%;
}
.scrollbar-demo-item {
  background-color: pink;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;

  color: var(--el-color-danger);
}
</style>
