import {ref} from "vue";
import {Queue, ResolveCallback} from "@psr-framework/typescript-utils"
import {ElMessage} from "element-plus"
import "element-plus/es/components/message/style/css"

type MessageLevel = 'info' | 'success' | 'warn' | 'error' | 'debug'

interface Message {
    time: Date,
    stack?: string,
    message: string,
    data?: any[]
    level: MessageLevel
}


export interface MessageOptions {
    data?: any[]
    toast?: boolean
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
            toast: true,
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

    message(message: string, {data = [], toast, console, log, level}: MessageOptions & { level: MessageLevel }) {
        const msgObj: Message = {
            time: new Date(),
            message,
            data,
            stack: (new Error()).stack?.split("\n")[2].trim().split(" ")[1],
            level
        }
        this.messages.value.push(msgObj)
        if (toast) {
            this.toastOut(msgObj)
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

    private consoleOut({message, level, data = []}: Message) {
        switch (level) {
            case "info":
            case "success":
                console.info(message, ...data)
                break
            case "debug":
                console.trace(message, ...data)
                break
            case "warn":
                console.warn(message, ...data)
                break
            case "error":
                console.error(message, ...data)
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