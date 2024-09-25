<script setup lang="ts">
import {ElInput} from "element-plus"
import {PsrElArrayJsonInput} from "@psr-framework/vue3-plugin"
import {ref} from "vue";

const value = ref<string>('["1","2","3"]')
</script>

<template>
  <div style="height: 300px;">
    <el-input v-model="value"/>
    <psr-el-array-json-input disabled class="mt-1" v-model="value" placeholder="输入项目并回车添加"/>
  </div>
</template>