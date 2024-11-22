<script setup lang="ts">
defineProps<{
  compData: {
    text: string
    count: number
  }
}>()

</script>

<template>
  <div>
    count:{{ compData.count }}
    <button @click="compData.count++">{{ compData.text }}</button>
  </div>
</template>