<template>
  <psr-aside-main style="height: 300px;">
    <template #left>
      <div style="height:100%;border: 1px solid red;">左侧边栏</div>
    </template>
    <template #main>
      <div style="height:100%;border: 1px solid red;">主视口</div>
    </template>
    <template #right>
      <div style="height:100%;border: 1px solid red;">右侧边栏</div>
    </template>
  </psr-aside-main>
</template>

<script setup lang="ts">
import {PsrAsideMain} from "@psr-framework/vue3-plugin";
</script>