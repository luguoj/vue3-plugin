<script setup lang="ts">
import {ElContainer, ElHeader, ElMain} from "element-plus"
import "element-plus/es/components/container/style/css"
import "element-plus/es/components/header/style/css"
import "element-plus/es/components/main/style/css"
import {PsrMessageList, PsrPortalMessage} from "../package";

const msg = PsrPortalMessage.useMessage()

function clear() {
  msg.clear()
}

function info() {
  msg.info("test-info", {
    data: [{a: 1}],
    console: true
  })
}

function debug() {
  msg.debug("test-debug%o", {
    data: [{a: 1}],
  })
}

function error() {
  msg.error("test-err", {
    data: [{a: 1}],
    console: true
  })
}

function success() {
  msg.success("test-info", {
    data: [{a: 1}],
    console: true
  })
}

function warn() {
  msg.warn("test-war", {
    data: [{a: 1}],
    console: true
  })
}
</script>

<template>
  <el-container style="height: 100%;">
    <el-header>
      <button @click="clear">clear</button>
      <button @click="info">info</button>
      <button @click="error">error</button>
      <button @click="success">success</button>
      <button @click="debug">debug</button>
      <button @click="warn">warn</button>
    </el-header>
    <el-main>
      <PsrMessageList/>
    </el-main>
  </el-container>
</template>

<style scoped>
</style>
