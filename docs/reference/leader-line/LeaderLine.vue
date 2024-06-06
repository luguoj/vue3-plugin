<script setup lang="ts">
import {PsrLeaderLine, PsrLeaderLineTypes} from "@psr-framework/vue3-plugin";
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
  end.value == elTo2.value ? (end.value = elTo.value) : (end.value = elTo2.value)
}

const lineOptions: PsrLeaderLineTypes.Options = {
  dash: {
    animation: true
  }
}

const anchorOptions: PsrLeaderLineTypes.PointAnchorOptions = {}
</script>

<template>
  <div style="height:350px;position: relative;">
    <button @click="handle">switch</button>
    <div
        ref="elFrom"
        style="height: 20px;width: 20px;border:solid"
    />
    <div
        ref="elTo"
        style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;"
    />
    <div
        ref="elTo2"
        style="height: 20px;width: 20px;border:solid;position: absolute;left:0px;top:300px;"
    />
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