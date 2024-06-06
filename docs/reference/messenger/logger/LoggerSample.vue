<script setup lang="ts">
import {PsrLogger} from "@psr-framework/vue3-plugin";
import {ElButton} from "element-plus"

const log = PsrLogger.useLog();

</script>

<template>
  <el-button type="info" @click="log.info('info')">info</el-button>
  <el-button type="success" @click="log.success('success')">success</el-button>
  <el-button type="warning" @click="log.warn('warn')">warn</el-button>
  <el-button type="danger" @click="log.error('error')">error</el-button>
</template>