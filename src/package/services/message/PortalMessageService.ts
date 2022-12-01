import {ref} from "vue";
import {Queue, ResolveCallback} from "@psr-framework/typescript-utils"
import {ElMessage, ElNotification} from "element-plus"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/notification/style/css"

export type MessageLevel = 'info' | 'success' | 'warn' | 'error' | 'debug'

interface Owner {
    method: string
    source: string
}

interface Message {
    time: Date,
    owner?: Owner,
    message: string,
    data?: any
    level: MessageLevel
}


export interface MessageOptions {
    data?: any
    toast?: boolean
    notify?: boolean
    console?: boolean
    log?: boolean
}

export interface LogService {
    (message: Message): Promise<boolean>
}

export class PortalMessageService {
    readonly messages = ref<Message[]>([])
    readonly loggingQueue: Queue = new Queue()
    private readonly _debugging
    private readonly _logService?: LogService

    constructor(options: { logService?: LogService, debugging?: boolean }) {
        this._logService = options.logService
        this._debugging = !!options.debugging
    }

    clear() {
        this.messages.value = []
    }

    info(message: string, options?: MessageOptions) {
        this.message(message, {
            notify: true,
            log: true,
            ...options,
            level: 'info'
        })
    }

    success(message: string, options?: MessageOptions) {
        this.message(message, {
            toast: true,
            log: true,
            ...options,
            level: 'success'
        })
    }

    warn(message: string, options?: MessageOptions) {
        this.message(message, {
            toast: true,
            log: true,
            ...options,
            level: 'warn'
        })
    }

    error(message: string, options?: MessageOptions) {
        this.message(message, {
            toast: true,
            log: true,
            ...options,
            level: 'error'
        })
    }

    debug(message: string, options?: MessageOptions) {
        this.message(message, {
            console: true,
            log: true,
            ...options,
            level: 'debug'
        })
    }

    message(message: string, {data, toast, notify, console, log, level}: MessageOptions & { level: MessageLevel }) {
        const stackStrs = (new Error()).stack?.split("\n")
        let owner: Owner | undefined
        if (stackStrs && stackStrs.length > 0) {
            stackStrs.splice(0, 3)
            const [, method, source] = stackStrs[0].trim().split(' ')
            owner = {
                method,
                source: source.substring(1, source.length - 1)
            }
        }
        const msgObj: Message = {
            time: new Date(),
            message,
            data,
            owner,
            level
        }
        this.messages.value.push(msgObj)
        if (toast) {
            this.toastOut(msgObj)
        }
        if (notify) {
            this.notifyOut(msgObj)
        }
        if (console) {
            this.consoleOut(msgObj)
        }
        if (log) {
            this.log(msgObj)
        }
    }

    private toastOut({message, level}: Message) {
        switch (level) {
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

    private notifyOut({message, level}: Message) {
        switch (level) {
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

    private consoleOut({message, level, owner, data}: Message) {
        let msg = message
        if (data) {
            msg += '\n- data:%o'
        }
        if (owner) {
            msg += `\n- owner: ${owner.method}\t@ ${owner.source}`
        }
        switch (level) {
            case "info":
            case "success":
                console.info(msg, data)
                break
            case "debug":
                console.debug(msg, data)
                break
            case "warn":
                console.warn(msg, data)
                break
            case "error":
                console.error(msg, data)
                break
        }
    }

    private log(message: Message) {
        if (this._logService) {
            const logService = this._logService
            this.loggingQueue.enqueue<boolean>((resolve: ResolveCallback<boolean>, reject) => {
                return logService(message).then(resolve).catch(reject)
            })
        }
    }

}