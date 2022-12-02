import {App, inject} from "vue";
import {MessageService} from "../services/message/MessageService";
import {PsrPortalMessageTypes} from "../types/PsrPortalMessageTypes";

const injectKey: symbol = Symbol('portal-message')

export class PsrPortalMessage<M extends PsrPortalMessageTypes.MessageOptions> {
    private _service?: MessageService<M>
    private _serviceFactory: () => MessageService<M>

    constructor(serviceFactory: () => MessageService<M>) {
        this._serviceFactory = serviceFactory
    }

    static useMessage<M extends PsrPortalMessageTypes.MessageOptions>(): MessageService<M> {
        const plugin = inject<PsrPortalMessage<M>>(injectKey)
        if (!plugin) {
            throw new Error("获取PortalMessage失败")
        }
        if (!plugin._service) {
            plugin._service = plugin._serviceFactory()
        }
        return plugin._service
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}