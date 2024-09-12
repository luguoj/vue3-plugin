import {ElMessage, ElNotification} from "element-plus";
import {PsrLoggerTypes} from "../types/PsrLoggerTypes";

function getMessageType(topic?: PsrLoggerTypes.LogLevel) {
    switch (topic) {
        case 'info':
            return 'info'
        case 'success':
            return 'success'
        case 'warn':
            return 'warning'
        case 'error':
            return 'error'
        default:
            return undefined
    }
}

function getTitle(topic?: PsrLoggerTypes.LogLevel) {
    switch (topic) {
        case 'info':
            return '信息'
        case 'success':
            return '成功'
        case 'warn':
            return '警告'
        case 'error':
            return '错误'
        default:
            return '提醒'
    }
}

export function usePsrElLogSubscriber(): PsrLoggerTypes.Subscriber<PsrLoggerTypes.LogOptions>[] {
    const popupSubscriber: PsrLoggerTypes.Subscriber<PsrLoggerTypes.LogOptions> = (
        {
            message,
            topic
        },
        {
            feedback
        }
    ) => {
        if (feedback) {
            const type = getMessageType(topic)
            if (type) {
                ElMessage({
                    message,
                    type
                })
            }
        }
    }

    const notifySubscriber: PsrLoggerTypes.Subscriber<PsrLoggerTypes.LogOptions> = (
        {
            message,
            topic
        },
        {
            notify
        }
    ) => {
        if (notify) {
            const type = getMessageType(topic)
            const title = getTitle(topic)
            let options = {}
            if (typeof notify === 'object') {
                options = {
                    ...notify
                }
            }
            ElNotification({
                title,
                message,
                type,
                ...options
            })
        }
    }
    return [popupSubscriber, notifySubscriber]
}