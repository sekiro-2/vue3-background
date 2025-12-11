<script setup>
import { ref } from 'vue'
import Editemploy from './Editemploy.vue'
const props = defineProps({
  showMask: Boolean,
  data: Object,
  type: String,
})
const emit = defineEmits(['close', 'finish'])
const closeShowMask = () => {
  emit('close')
}
const handleOK = () => {
  emit('finish')
}
</script>

<template>
  <div v-show="props.showMask" class="modal-mask" @click.self="closeShowMask">
    <Editemploy :data="data" :type="type" @close="closeShowMask" @finish="handleOK"></Editemploy>
  </div>
</template>
<style scoped lang="scss">
.modal-mask {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 9999;
  justify-content: right;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
