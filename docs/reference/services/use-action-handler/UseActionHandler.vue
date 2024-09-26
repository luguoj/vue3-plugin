<script setup lang="ts">
import {PsrLoggerTypes, useActionHandler} from "@psr-framework/vue3-plugin"
import {ref} from "vue";

const handleAction = useActionHandler<
    string, // 入参类型
    string // 出参类型
>(
    // 操作业务回调
    (
        param: string // 入参
    ): string | Promise<string> => {
      if (param == '成功') {
        // 处理成功，可以返回Promise或值
        return 'success'
      }
      // 处理失败，可以返回Promise或抛出异常
      return Promise.reject('处理失败')
    },
    // 操作选项
    {
      // 操作名称，默认值 '操作'
      actionName: '测试操作',
      // 静默执行标识，默认值 false。如果配置为 true，则在执行成功后不会显示成功提示
      silent: false,
      // 校验，抛出异常或返回false则不会执行操作
      validate: (options: {
        params: string,
        logger: PsrLoggerTypes.LogService<any>
      }): boolean | void | Promise<boolean | void> => {
        if (options.params == '校验错误') {
          // 校验失败可以通过logger参数显示提示或记录日志
          options.logger.error('校验失败原因', {notify: true})
          // 校验失败，返回校验结果可以为Promise或false,或直接抛出异常
          throw new Error('123')
        }
        // 校验成功，返回校验结果可以为Promise或true,或直接不返回(void)
        return Promise.resolve(true)
      },
      // 开始事件回调
      start: (options: { params: string, logger: PsrLoggerTypes.LogService<any> }): void => {
        options.logger.info('开始执行:' + options.params, {notify: true})
      },
      // 成功事件回调
      success: (options: { params: string, result: string, logger: PsrLoggerTypes.LogService<any> }): void => {
        options.logger.info(`执行成功:${options.params}=>${options.result}`, {notify: true})
      },
      // 失败事件回调
      failure: (options: { params: string, error: any, logger: PsrLoggerTypes.LogService<any> }): void => {
        options.logger.info(`执行失败:${options.params}=>${options.error}`, {notify: true})
      },
      // 完成事件回调
      complete: (options: {
        params: string,
        result?: string,
        error?: any,
        logger: PsrLoggerTypes.LogService<any>
      }): void => {
        options.logger.info(`执行完成:${options.params}`, {notify: true})
      },
      // 执行确认标识，默认值 false。如果配置为 true，则在执行前会先提示用户是否继续执行操作
      confirmation: true,
      // 确认提示信息，默认值 '是否继续?'。可直接使用字符串或者回调函数
      confirmationMessage: (params: string): string => {
        return params + '，确认执行？'
      },
      // 确认时，用户点击取消按钮的回调
      cancel: (params: string): void => {
        console.log('用户取消操作', params)
      }
    }
)
const resultRef = ref('')
</script>

<template>
  <button @click="handleAction('成功')">用户操作成功</button>
  <button @click="handleAction('失败')">用户操作失败</button>
  <button @click="handleAction('校验错误')">校验失败</button>
  <div>{{ resultRef }}</div>
</template>