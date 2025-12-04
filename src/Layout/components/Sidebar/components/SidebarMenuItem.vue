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
    <template v-if="!item.children || item.children.length === 1">
      <template v-if="!item.children">
        <el-menu-item :index="item.path" v-if="!item?.meta?.hidden">
          <SidebarMenuItemTitle :icon="item?.meta?.icon" />
          <el-icon><icon-menu /></el-icon>
          {{ item?.meta?.title }}
        </el-menu-item>
      </template>
      <template v-else>
        <el-menu-item :index="item.children[0].path">
          <SidebarMenuItemTitle :icon="item?.children[0].meta?.icon" />
          <span v-if="!collapse"> {{ item?.children[0].meta?.title }}</span>
        </el-menu-item>
      </template>
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
