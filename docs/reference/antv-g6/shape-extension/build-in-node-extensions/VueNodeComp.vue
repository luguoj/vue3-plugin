<script setup lang="ts">
defineProps<{
  compData: {
    text: string
    count: number
  }
}>()

</script>

<template>
  <button @click="compData.count++">{{ compData.text }}-{{ compData.count }}</button>
</template>