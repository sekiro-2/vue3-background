<script setup>
import EmployHeader from './components/EmployHeader.vue'
import EmployFrom from './components/EmployFrom.vue'
import { ref } from 'vue'
defineOptions({
  name: 'Employee',
})
const updated = ref(false)
const sortForm = ref()
const handleFinishAdd = () => {
  updated.value = true
}
const handleSort = (sort) => {
  sortForm.value = sort
  updated.value = false
}
</script>
<template>
  <EmployHeader @to-form="handleFinishAdd" @sort="handleSort"></EmployHeader>
  <EmployFrom :updated="updated" :sort="sortForm"></EmployFrom>
</template>

<style scoped lang="scss"></style>
