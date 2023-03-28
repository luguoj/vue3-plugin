<script setup lang="ts">
import {PsrLeaderLine, PsrLeaderLineTypes} from "../package";
import {onMounted, ref} from "vue";
import P1 from "./p1.vue"

const elFrom = ref()
const elTo = ref()
const elTo2 = ref()
const start = ref()
const end = ref()
onMounted(() => {
  start.value = elFrom.value
  end.value = elTo.value
  // new LeaderLine(elFrom.value, elTo.value)
})

function handle() {
  flag.value = !flag.value
}

const lineOptions: PsrLeaderLineTypes.Options = {
  dash: {
    animation: true
  }
}

const anchorOptions: PsrLeaderLineTypes.PointAnchorOptions = {}

const flag = ref(true)
</script>

<template>
  <button @click="handle">switch</button>
  <p1 v-if="flag"></p1>
</template>

<style scoped>
</style>
