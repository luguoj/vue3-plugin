import {ref} from "vue";
import {PsrPortalMessageTypes} from "../../types/PsrPortalMessageTypes";

export class MessageService<M extends PsrPortalMessageTypes.MessageOptions> {
    readonly messages = ref<PsrPortalMessageTypes.Message[]>([])
    private readonly _debugging

    protected constructor(debugging?: boolean) {
        this._debugging = debugging
    }

    clear() {
        this.messages.value = []
    }

    info(message: string, options?: M) {
        this.message('info', message, {
            ...this._infoOptions(),
            ...options,
        })
    }

    success(message: string, options?: M) {
        this.message('success', message, {
            ...this._successOptions(),
            ...options,
        })
    }

    warn(message: string, options?: M) {
        this.message('warn', message, {
            ...this._warnOptions(),
            ...options
        })
    }

    error(message: string, options?: M) {
        this.message('error', message, {
            ...this._errorOptions(),
            ...options,
        })
    }

    debug(message: string, options?: M) {
        if (this._debugging) {
            this.message('debug', message, {
                ...this._debugOptions(),
                ...options
            })
        }
    }

    message(
        level: PsrPortalMessageTypes.MessageLevel,
        message: string,
        options: M
    ) {
        const stackStrs = (new Error()).stack?.split("\n")
        let owner: PsrPortalMessageTypes.MessageOwner | undefined
        if (stackStrs && stackStrs.length > 0) {
            stackStrs.splice(0, 3)
            const [, method, source] = stackStrs[0].trim().split(' ')
            owner = {
                method: source ? method : '(匿名)',
                source: source?.substring(1, source.length - 1) || method
            }
        }
        const msgObj: PsrPortalMessageTypes.Message = {
            time: new Date(),
            message,
            data: options.data,
            owner,
            level
        }
        this.messages.value.push(msgObj)
        if (options.console || this._debugging) {
            this.consoleOut(msgObj)
        }
        this._sendMessage(level, msgObj, options)
    }

    protected _sendMessage(
        level: PsrPortalMessageTypes.MessageLevel,
        msgObj: PsrPortalMessageTypes.Message,
        options: M
    ): void {
    }

    protected _infoOptions(): M {
        return {} as M
    }

    protected _successOptions(): M {
        return {} as M
    }

    protected _warnOptions(): M {
        return {} as M
    }

    protected _errorOptions(): M {
        return {} as M
    }

    protected _debugOptions(): M {
        return {} as M
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
}