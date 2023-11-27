<script setup lang="ts">
import Button from 'primevue/button';

let theme = true;

function handler() {
  document.getElementsByTagName('html')[0].className = theme ? 'dark' : ''
  theme = !theme
}
</script>

<template>
  <div style="height: 100%;width: 100%;">
    <Button @click="handler">abc</Button>
    <Button @click="handler">主题</Button>
  </div>
</template>

<style scoped>
</style>
