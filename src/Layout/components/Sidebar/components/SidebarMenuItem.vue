<script setup>
import SidebarMenuItem from './SidebarMenuItem.vue'
import SidebarMenuItemTitle from './SidebarMenuItenTitle.vue'
const props = defineProps({
  item: Object,
  collapse: Boolean,
})
</script>

<template>
  <div v-if="!item.meta || !item.meta?.hidden">
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item?.meta?.hidden">
        <template #title>
          <SidebarMenuItemTitle :icon="item?.meta?.icon" />
          {{ item?.meta?.title }}
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <SidebarMenuItemTitle :icon="item?.meta?.icon" />
        <span v-if="!collapse">{{ item?.meta?.title }}</span>
      </template>
      <SidebarMenuItem v-for="child in item.children" :key="child.path" :item="child" />
    </el-sub-menu>
  </div>
</template>
