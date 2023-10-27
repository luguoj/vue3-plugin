<script setup lang="ts">
import {PsrLeaderLine, PsrLeaderLineTypes} from "../package";
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

function handle() {
  end.value = elTo2.value
}

const lineOptions: PsrLeaderLineTypes.Options = {
  dash: {
    animation: true
  }
}

const anchorOptions: PsrLeaderLineTypes.PointAnchorOptions = {

}
</script>

<template>
  <button @click="handle">switch</button>
  <div style="height: 100%;width: 100%;position: relative">
    <div id="div-from" style="height: 20px;width: 20px;border:solid" ref="elFrom"/>
    <div id="div-to" style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;" ref="elTo"/>
    <div id="div-to2" style="height: 20px;width: 20px;border:solid;position: absolute;left:0px;top:300px;" ref="elTo2"/>
    <psr-leader-line
        :leader-line-start="start"
        :leader-line-end="end"
        :leader-line-options="lineOptions"
        :leader-line-point-anchor-start="anchorOptions"
    />
  </div>
</template>

<style scoped>
</style>
