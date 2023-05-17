<script setup lang="ts">

withDefaults(defineProps<{
    compText?: string
    compNumber?:number
}>(), {
    compText: 'text'
})
</script>

<template>
    <div>{{ compText }}-{{ compNumber}}</div>
</template>

<style scoped>

</style>