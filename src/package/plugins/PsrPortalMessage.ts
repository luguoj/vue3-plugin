import {App, inject} from "vue";
import {MessageService} from "../services/message/MessageService";
import {PsrPortalMessageTypes} from "../types/PsrPortalMessageTypes";

const injectKey: symbol = Symbol('portal-message')

export class PsrPortalMessage {
    private readonly _debugging: boolean
    private readonly _loggerProvider?: () => PsrPortalMessageTypes.LogService
    private _service: MessageService | undefined

    constructor(options: {
        debugging?: boolean
        logger?: () => PsrPortalMessageTypes.LogService
    }) {
        this._debugging = !!options.debugging
        this._loggerProvider = options.logger
    }

    static useMessage(): MessageService {
        const plugin = inject<PsrPortalMessage>(injectKey)
        if (!plugin) {
            throw new Error("获取PortalMessage失败")
        }
        if (!plugin._service) {
            const logService = plugin._loggerProvider && plugin._loggerProvider()
            plugin._service = new MessageService({logService, debugging: plugin._debugging})
        }
        return plugin._service
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}