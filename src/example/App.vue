<script setup lang="ts">

import {PsrPortalMessage} from "../package";

const msg = PsrPortalMessage.useMessage()
msg.debug("test-debug%o", {
  data: [{a: 1}],
})
msg.success("test-info", {
  data: [{a: 1}],
  console: true
})
msg.error("test-err", {
  data: [{a: 1}],
  console: true
})

</script>

<template>
</template>

<style scoped>
</style>
