<template>
  <div id="div-from" style="height: 20px;width: 20px;border:solid" ref="elFrom"/>
  <div id="div-to" style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;" ref="elTo"/>
  <psr-leader-line
      :leader-line-start="elFrom"
      :leader-line-end="elTo"
      :leader-line-options="lineOptions"
      :leader-line-area-anchor-start="anchorOptions"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";
import {PsrLeaderLineTypes} from "../package";

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