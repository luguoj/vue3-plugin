<template>
  <button @click="increment">{{ count }}</button>
</template>

<script setup lang="ts">
import {useSample2Store} from "./useSampleStore";
import {storeToRefs} from "pinia";

const store = useSample2Store()

const {count} = storeToRefs(store)
const {increment} = store
</script>

<style scoped>

</style>