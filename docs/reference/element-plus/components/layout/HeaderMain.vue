<template>
  <psr-header-main style="height: 300px;">
    <template #header>
      <div style="height:50px;border: 1px solid red;">页头</div>
    </template>
    <template #main>
      <div style="height:100%;border: 1px solid red;">主视口</div>
    </template>
    <template #footer>
      <div style="height:50px;border: 1px solid red;">页脚</div>
    </template>
  </psr-header-main>
</template>

<script setup lang="ts">
import {PsrHeaderMain} from "@psr-framework/vue3-plugin";
</script>