import {PsrLogger, PsrLoggerTypes} from "@psr-framework/vue3-plugin";
import {ElMessage, ElNotification} from "element-plus"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/notification/style/css"

// 扩展日志消息选项类型
export interface LogOptions extends PsrLoggerTypes.LogOptions {
    // toast消息
    toast?: boolean
    // 提示消息
    notify?: boolean
    // 日志采集
    log?: boolean
}

// 根据不同级别采用不同的日志消息选项
function optionsByLevel(level: PsrLoggerTypes.LogLevel): LogOptions | undefined {
    switch (level) {
        case "info":
            return {
                notify: true,
                log: true,
            }
        case "debug":
            return {log: true}
        case "success":
            return {
                toast: true,
                log: true,
            }
        case "warn":
            return {
                toast: true,
                log: true,
            }
        case "error":
            return {
                toast: true,
                log: true,
            }
    }
}

// 模拟日志采集服务
const logApi: PsrLoggerTypes.Subscriber<LogOptions> = (logObj: PsrLoggerTypes.Log, {log}) => {
    if (log) {
        setTimeout(() => {
            console.log('message saved:%o', logObj)
        }, 1000)
    }
}

// toast消息处理
const toastOut: PsrLoggerTypes.Subscriber<LogOptions> = ({message}, {toast, topic}) => {
    if (toast) {
        // 可根据级别实现不同的效果
        switch (topic) {
            case "info":
            case "debug":
                ElNotification({title: '消息', message, type: 'info'})
                break
            case "success":
                ElNotification({title: '成功', message, type: 'success'})
                break
            case "warn":
                ElNotification({title: '警告', message, type: 'warning'})
                break
            case "error":
                ElNotification({title: '错误', message, type: 'error'})
                break
        }
    }
}
// 提示消息处理
const notifyOut: PsrLoggerTypes.Subscriber<LogOptions> = ({message}, {notify, topic}) => {
    if (notify) {
        switch (topic) {
            case "info":
            case "debug":
                ElMessage({message})
                break
            case "success":
                ElMessage({message, type: 'success'})
                break
            case "warn":
                ElMessage({message, type: 'warning'})
                break
            case "error":
                ElMessage({message, type: 'error'})
                break
        }
    }
}

export const logger = PsrLogger.create({
    // 启用调试，启用后所有消息将在控制台输出
    debugging: true,
    // 消息级别对应选项定义
    optionsByLevel,
    // 订阅消息的处理器
    subscribers: [toastOut, notifyOut, logApi]
})

// 安装用日志插件
// createApp(App).use(logger).mount('#app')
