<script setup lang="ts">
import {usePsrColorScheme} from "@psr-framework/vue3-plugin";

const color = usePsrColorScheme()
</script>

<template>
  <div>当前color-scheme: {{ color }}</div>
</template>