<script setup>
import axios from 'axios'
const getData = async () => {
  const res = await axios.get('/api/employees')
  console.log(res)
}
getData()
</script>

<template>部门展示</template>
