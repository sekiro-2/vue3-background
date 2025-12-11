<script setup>
import { getEmployListAPI } from '@/apis/employ'

const getGoodList = async () => {
  const res = await getEmployListAPI()
  console.log(res)
}
getGoodList()
</script>

<template>部门展示</template>
