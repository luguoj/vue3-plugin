import {ElMessage, ElNotification} from "element-plus"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/notification/style/css"
import {PsrLogger, PsrLoggerTypes} from "../package";

export interface LogOptions extends PsrLoggerTypes.LogOptions {
    toast?: boolean
    notify?: boolean
    log?: boolean
}

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

const logApi: PsrLoggerTypes.Subscriber<LogOptions> = (logObj: PsrLoggerTypes.Log, {log}) => {
    if (log) {
        setTimeout(() => {
            console.log('message saved:%o', logObj)
        }, 1000)
    }
}
const toastOut: PsrLoggerTypes.Subscriber<LogOptions> = ({message}, {toast, topic}) => {
    if (toast) {
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
const notifyOut: PsrLoggerTypes.Subscriber<LogOptions> = ({message}, {notify, topic}) => {
    if (notify) {
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

export const logger = PsrLogger.create({
    debugging: true,
    optionsByLevel,
    subscribers: [toastOut, notifyOut, logApi]
})