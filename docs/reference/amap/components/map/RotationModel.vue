<script setup lang="ts">
import {PsrAMap} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const rotation = ref<number>()
const rotatingFlag = ref<boolean>()
</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="rotatingFlag = false;rotation=(rotation||0) - 30;">-</button>
    <button class="el-button" @click="rotatingFlag = false;rotation=(rotation||0) + 30">+</button>
    <psr-a-map
        style="height: 100%;"
        v-model:map-rotation="rotation"
        v-model:map-rotating-flag="rotatingFlag"
    >
      <div>rotation: {{ rotation || "0" }}</div>
      <div>rotating: {{ rotatingFlag}}</div>
    </psr-a-map>
  </div>
</template>