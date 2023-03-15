<script setup lang="ts">
import {LeaderLine} from "../package";
import {onMounted, ref} from "vue";

const elFrom = ref()
const elTo = ref()
const elTo2 = ref()
const start = ref()
const end = ref()
onMounted(() => {
  start.value = elFrom.value
  end.value = elTo.value
})

function handle(){
  end.value=elTo2.value
}

const lineOptions = {
  dash: {
    animation: true
  }
}
</script>

<template>
  <button @click="handle">switch</button>
  <div style="height: 100%;width: 100%;position: relative">
    <div id="div-from" style="height: 20px;width: 20px;border:solid" ref="elFrom"/>
    <div id="div-to" style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;" ref="elTo"/>
    <div id="div-to2" style="height: 20px;width: 20px;border:solid;position: absolute;left:0px;top:300px;" ref="elTo2"/>
    <LeaderLine :leader-line-start="start" :leader-line-end="end" :leader-line-options="lineOptions"/>
  </div>
</template>

<style scoped>
</style>
