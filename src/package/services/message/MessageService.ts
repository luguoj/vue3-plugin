import {ref} from "vue";
import {ElMessage, ElNotification} from "element-plus"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/notification/style/css"
import {PromiseQueue} from "@psr-framework/typescript-utils"
import {PsrPortalMessageTypes} from "../../types/PsrPortalMessageTypes";

export class MessageService {
    readonly messages = ref<PsrPortalMessageTypes.Message[]>([])
    readonly loggingQueue: PromiseQueue.Queue = new PromiseQueue.Queue()
    private readonly _debugging
    private readonly _logService?: PsrPortalMessageTypes.LogService

    constructor(options: { logService?: PsrPortalMessageTypes.LogService, debugging?: boolean }) {
        this._logService = options.logService
        this._debugging = !!options.debugging
    }

    clear() {
        this.messages.value = []
    }

    info(message: string, options?: PsrPortalMessageTypes.MessageOptions) {
        this.message(message, {
            notify: true,
            log: true,
            ...options,
            level: 'info'
        })
    }

    success(message: string, options?: PsrPortalMessageTypes.MessageOptions) {
        this.message(message, {
            toast: true,
            log: true,
            ...options,
            level: 'success'
        })
    }

    warn(message: string, options?: PsrPortalMessageTypes.MessageOptions) {
        this.message(message, {
            toast: true,
            log: true,
            ...options,
            level: 'warn'
        })
    }

    error(message: string, options?: PsrPortalMessageTypes.MessageOptions) {
        this.message(message, {
            toast: true,
            log: true,
            ...options,
            level: 'error'
        })
    }

    debug(message: string, options?: PsrPortalMessageTypes.MessageOptions) {
        this.message(message, {
            console: true,
            log: true,
            ...options,
            level: 'debug'
        })
    }

    message(
        message: string,
        {
            data,
            toast,
            notify,
            console,
            log,
            level
        }: PsrPortalMessageTypes.MessageOptions & {
            level: PsrPortalMessageTypes.MessageLevel
        }
    ) {
        const stackStrs = (new Error()).stack?.split("\n")
        let owner: PsrPortalMessageTypes.MessageOwner | undefined
        if (stackStrs && stackStrs.length > 0) {
            stackStrs.splice(0, 3)
            const [, method, source] = stackStrs[0].trim().split(' ')
            owner = {
                method,
                source: source.substring(1, source.length - 1)
            }
        }
        const msgObj: PsrPortalMessageTypes.Message = {
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

    private toastOut({message, level}: PsrPortalMessageTypes.Message) {
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

    private notifyOut({message, level}: PsrPortalMessageTypes.Message) {
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

    private consoleOut({message, level, owner, data}: PsrPortalMessageTypes.Message) {
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

    private log(message: PsrPortalMessageTypes.Message) {
        if (this._logService) {
            const logService = this._logService
            this.loggingQueue.enqueue<boolean>((resolve: PromiseQueue.ResolveCallback<boolean>, reject: PromiseQueue.RejectCallback) => {
                return logService(message).then(resolve).catch(reject)
            }).then()
        }
    }

}