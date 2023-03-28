<template>
  <div
       style="height: 100%;width: 100%;position: relative;top:100px;left:100px; transform: scale(1.2)">
    <div id="div-from" style="height: 20px;width: 20px;border:solid" ref="elFrom"/>
    <div id="div-to" style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;"
         ref="elTo"/>
    <psr-leader-line
        :leader-line-start="elFrom"
        :leader-line-end="elTo"
        :leader-line-options="lineOptions"
        :leader-line-point-anchor-start="anchorOptions"
        :leader-line-scale="1.2"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {PsrLeaderLine, PsrLeaderLineTypes} from "../package";

const elFrom = ref()
const elTo = ref()

const lineOptions: PsrLeaderLineTypes.Options = {
  dash: {
    animation: true
  }
}

const anchorOptions: PsrLeaderLineTypes.PointAnchorOptions = {

}
</script>

<style scoped>

</style>