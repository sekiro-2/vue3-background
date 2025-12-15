<script setup>
import { computed, KeepAlive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStore, useRouterStore, useAppStore } from '@/stores'
import router from '@/router'
const route = useRoute()
const routerStore = useRouterStore()
const tagsViewStore = useTagsViewStore()
const appStore = useAppStore()

const tags = computed(() => tagsViewStore.tagsView)
const addTags = () => {
  tagsViewStore.addView({
    name: route.name,
    fullPath: route.fullPath,
    title: route.meta.title,
    affix: route.meta?.affix,
    keepAlive: route.meta?.keepAlive,
  })
}
const deleteTagView = (deleteTags) => {
  if (deleteTags.fullPath !== route.fullPath) {
    tagsViewStore.deletView(deleteTags)
  } else {
    tagsViewStore.deletView(deleteTags)
    // 删除激活状态页面，跳转到上一页面
    router.push(tags.value[tags.value.length - 1].fullPath)
  }
}
watch(
  route,
  () => {
    addTags()
  },
  {
    immediate: true, //初始化立即执行
  },
)
</script>
<template>
  <el-scrollbar>
    <div class="tags">
      <router-link
        v-for="tag in tags"
        :to="tag.fullPath"
        :key="tag.fullPath"
        :class="['tagview', { isactive: tag.fullPath === route.fullPath }]"
      >
        {{ tag.title }}
        <div
          v-if="!tag?.affix"
          class="i-svg:delete delete-icon"
          @click.prevent.stop="deleteTagView(tag)"
        ></div>
      </router-link>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.isactive {
  background-color: v-bind('appStore.tagsViewBgc');
  color: #fff !important;
}

.tags {
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  margin-left: 10px;
  margin-top: 3px;
  .tagview {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    color: #333;
    border-radius: 2px;
    margin: 0 5px;
    cursor: pointer;
  }

  .delete-icon {
    font-size: 12px;
    &:hover {
      transform: scale(0.8);
    }
  }
}
::deep(.el-scrollbar__view) {
  height: 40px !important;
}
</style>
