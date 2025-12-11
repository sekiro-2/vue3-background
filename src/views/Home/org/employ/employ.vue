<script setup>
import EmployHeader from './components/EmployHeader.vue'
import EmployFrom from './components/EmployFrom.vue'
import { ref } from 'vue'
const updated = ref(false)
const updatedForm = () => {
  updated.value = true
}
</script>
<template>
  <EmployHeader @to-form="updatedForm"></EmployHeader>
  <EmployFrom :updated="updated"></EmployFrom>
</template>

<style scoped lang="scss"></style>
