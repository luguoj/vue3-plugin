<template>
  <div style="height: 350px;position:relative;">
    <button @click="hide=!hide">show/hide</button>
    <div
        ref="elFrom"
        style="height: 20px;width: 20px;border:solid"
    />
    <div
        ref="elTo"
        style="height: 20px;width: 20px;border:solid;position: absolute;left:300px;top:300px;"
    />
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
import {PsrLeaderLine, PsrLeaderLineTypes} from "@psr-framework/vue3-plugin";

const elFrom = ref()
const elTo = ref()
const hide = ref(false)
const lineOptions: PsrLeaderLineTypes.Options = {
  dash: {
    animation: true
  }
}

const anchorOptions: PsrLeaderLineTypes.PointAnchorOptions = {}
</script>