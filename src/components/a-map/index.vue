<script lang="ts">
export default {
  name: 'PsrVue3AMap'
}
</script>
<script setup lang="ts">

const props = defineProps<{
  message: string
}>()

const emits = defineEmits<{
  (e: 'my-event', msg: string): void
}>()

</script>

<template>
  <div class="title" @click.stop="$emit('my-event',message)">
    PSR AMap {{ message }}
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: red;
}
</style>
