<script setup lang="ts">
import {PsrElInputArray} from "@psr-framework/vue3-plugin"
import {ref} from "vue";

const value = ref<string[]>(["1", "2", "3"])
</script>

<template>
  <div style="height: 300px;">
    <psr-el-input-array
        class="mt-1"
        v-model="value"
        placeholder="输入项目并回车添加"
    />
  </div>
</template>