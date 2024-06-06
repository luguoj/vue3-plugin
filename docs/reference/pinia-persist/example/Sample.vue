<template>
  <button @click="increment">{{ count }}</button>
  <button @click="restore">restore</button>
</template>

<script setup lang="ts">
import {useSampleStore} from "./useSampleStore";
import {storeToRefs} from "pinia";

const store = useSampleStore()

const {count} = storeToRefs(store)
const {increment} = store

function restore() {
  store.$restore()
}
</script>

<style scoped>

</style>