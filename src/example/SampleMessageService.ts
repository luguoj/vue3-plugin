import {ElMessage, ElNotification} from "element-plus"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/notification/style/css"
import {PromiseQueue} from "@psr-framework/typescript-utils"
import {PsrPortalMessageTypes} from "../package";

export interface MessageOptions extends PsrPortalMessageTypes.MessageOptions {
    toast?: boolean
    notify?: boolean
    log?: boolean
}

export class SampleMessageService extends PsrPortalMessageTypes.MessageService<MessageOptions> {
    readonly loggingQueue: PromiseQueue.Queue = new PromiseQueue.Queue()
    private readonly _logService?: PsrPortalMessageTypes.LogService

    constructor(options: { logService?: PsrPortalMessageTypes.LogService, debugging?: boolean }) {
        super(options.debugging)
        this._logService = options.logService
    }

    _sendMessage(
        level: PsrPortalMessageTypes.MessageLevel,
        msgObj: PsrPortalMessageTypes.Message,
        {toast, notify, log}: MessageOptions
    ) {
        if (toast) {
            this.toastOut(msgObj)
        }
        if (notify) {
            this.notifyOut(msgObj)
        }
        if (log) {
            this.log(msgObj)
        }
    }

    protected _infoOptions(): MessageOptions {
        return {
            notify: true,
            log: true,
        };
    }

    protected _successOptions(): MessageOptions {
        return {
            toast: true,
            log: true,
        };
    }

    protected _warnOptions(): MessageOptions {
        return {
            toast: true,
            log: true,
        };
    }

    protected _errorOptions(): MessageOptions {
        return {
            toast: true,
            log: true,
        };
    }

    protected _debugOptions(): MessageOptions {
        return {log: true};
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

    private log(message: PsrPortalMessageTypes.Message) {
        if (this._logService) {
            const logService = this._logService
            this.loggingQueue.enqueue<boolean>((resolve: PromiseQueue.ResolveCallback<boolean>, reject: PromiseQueue.RejectCallback) => {
                return logService(message).then(resolve).catch(reject)
            }).then()
        }
    }

}