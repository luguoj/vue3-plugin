<template>
  <el-scrollbar ref="scrollbarRef" view-style="padding: 1rem;">
    <el-timeline style="padding-inline-start: 0;">
      <el-timeline-item
          v-for="(message,index) in messages" :key="index"
          :timestamp="getTimestamp(message.time)"
          :type="getType(message.level)"
          :icon="getIcon(message.level)"
          placement="top"
          center
          size="large"
      >
        <el-card :class="`message-card-${message.level}`">
          {{ message.message }}
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-scrollbar>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
import {ElCard, ElScrollbar, ElTimeline, ElTimelineItem, ScrollbarInstance} from "element-plus"
import "element-plus/es/components/scrollbar/style/css"
import "element-plus/es/components/timeline/style/css"
import "element-plus/es/components/timeline-item/style/css"
import "element-plus/es/components/card/style/css"
import {CircleCloseFilled, InfoFilled, QuestionFilled, SuccessFilled, WarningFilled} from "@element-plus/icons-vue"
import {PsrPortalMessage} from "../../plugins/PsrPortalMessage";
import {PsrPortalMessageTypes} from "../../types/PsrPortalMessageTypes";
import moment from "moment";

const scrollbarRef = ref<ScrollbarInstance>()

const msg = PsrPortalMessage.useMessage()
const messages = msg.messages

watch(messages, () => {
  scrollToBottom()
}, {deep: true})

watch(scrollbarRef, () => {
  scrollToBottom()
})

function scrollToBottom() {
  const scrollbar = scrollbarRef.value
  const wrapRef = scrollbar?.wrapRef
  if (scrollbar && wrapRef)
    nextTick(() => {
      scrollbar.setScrollTop(wrapRef.scrollHeight)
    })
}

function getType(level: PsrPortalMessageTypes.MessageLevel) {
  switch (level) {
    case "info":
      return "info"
    case "debug":
      return "primary"
    case "success":
      return "success"
    case "warn":
      return "warning"
    case "error":
      return "danger"
  }
}

function getIcon(level: PsrPortalMessageTypes.MessageLevel) {
  switch (level) {
    case "info":
      return InfoFilled
    case "debug":
      return QuestionFilled
    case "success":
      return SuccessFilled
    case "warn":
      return WarningFilled
    case "error":
      return CircleCloseFilled
  }
}

function getTimestamp(date: Date) {
  return moment(date).format('YYYY-MM-DD hh:mm:ss.SSS')
}

</script>

<style lang="scss" scoped>
.message-card-info {
  background-color: var(--el-color-info-light-9);
  color: var(--el-color-info);
}

.message-card-debug {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.message-card-success {
  background-color: var(--el-color-success-light-9);
  color: var(--el-color-success);
}

.message-card-warn {
  background-color: var(--el-color-warning-light-9);
  color: var(--el-color-warning);
}

.message-card-error {
  background-color: var(--el-color-error-light-9);
  color: var(--el-color-error);
}
</style>