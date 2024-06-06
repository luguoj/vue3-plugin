<template>
  <div style="height:500px;">
    <button @click="msg.clear()">清空</button>
    <el-scrollbar ref="scrollbarRef" view-style="padding: 1rem;">
      <el-timeline style="padding-inline-start: 0;">
        <el-timeline-item
            v-for="(message,index) in messages" :key="index"
            :timestamp="getTimestamp(message.time)"
            :type="getType(message.topic)"
            :icon="getIcon(message.topic)"
            placement="top"
            center
            size="large"
        >
          <el-card :class="`message-card-${message.topic}`">
            <h1>message content: {{ message.message }}</h1>
            <h4>source at: {{ message.owner?.source }}</h4>
            <h4>method: {{ message.owner?.method }}</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
import {ElCard, ElScrollbar, ElTimeline, ElTimelineItem, ScrollbarInstance} from "element-plus"
import "element-plus/es/components/scrollbar/style/css"
import "element-plus/es/components/timeline/style/css"
import "element-plus/es/components/timeline-item/style/css"
import "element-plus/es/components/card/style/css"
import {CircleCloseFilled, InfoFilled, QuestionFilled, SuccessFilled, WarningFilled} from "@element-plus/icons-vue"
import moment from "moment";
import {PsrLogger, PsrLoggerTypes} from "@psr-framework/vue3-plugin";


const scrollbarRef = ref<ScrollbarInstance>()

// 获取全局日志服务
const msg = PsrLogger.useLog()
// 获取消息记录
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

function getType(level?: PsrLoggerTypes.LogLevel) {
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

function getIcon(level?: PsrLoggerTypes.LogLevel) {
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