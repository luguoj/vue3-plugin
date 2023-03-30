<template>
  <div
      style="height: 100%;width: 100%;position: relative;top:100px;left:100px;">
    <div id="div-from" @click="hide=!hide" style="height: 20px;width: 20px;border:solid" ref="elFrom"/>
    <div id="div-to" style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;"
         ref="elTo"/>
    <psr-leader-line
        :leader-line-start="elFrom"
        :leader-line-end="elTo"
        :leader-line-options="lineOptions"
        :leader-line-point-anchor-start="anchorOptions"
        :leader-line-scale="1.2"
        :leader-line-hide="hide"
        :leader-line-show-effect="{name:'draw'}"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {PsrLeaderLine, PsrLeaderLineTypes} from "../package";

const elFrom = ref()
const elTo = ref()
const hide = ref(false)
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