import {App, inject} from "vue";
import {LogService, PortalMessageService} from "../services/message/PortalMessageService";

const injectKey: symbol = Symbol('portal-message')

export class PsrPortalMessage {
    private readonly _debugging: boolean
    private readonly _loggerProvider?: () => LogService
    private _service: PortalMessageService | undefined

    constructor(options: {
        debugging?: boolean
        logger?: () => LogService
    }) {
        this._debugging = !!options.debugging
        this._loggerProvider = options.logger
    }

    static useMessage(): PortalMessageService {
        const plugin = inject<PsrPortalMessage>(injectKey)
        if (!plugin) {
            throw new Error("获取PortalMessage失败")
        }
        if (!plugin._service) {
            const logService = plugin._loggerProvider && plugin._loggerProvider()
            plugin._service = new PortalMessageService({logService, debugging: plugin._debugging})
        }
        return plugin._service
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}