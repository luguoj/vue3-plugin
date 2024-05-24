<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

let hInterval: NodeJS.Timeout
const num = ref(0)
onMounted(() => {
  hInterval = setInterval(() => {
    num.value = num.value + 1
  }, 1000)
})

onUnmounted(() => {
  hInterval && clearInterval(hInterval)
})
</script>

<template>
  <span>{{ num }}</span>
</template>

<style scoped>

</style>