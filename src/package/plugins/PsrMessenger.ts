import {App, inject} from "vue";
import {MessageService} from "../services/message/MessageService";
import {PsrMessengerTypes} from "../types/PsrMessengerTypes";

const injectKey = Symbol('messenger')

export class PsrMessenger {
    private static _rootMessenger: PsrMessenger
    private readonly _messageServices: Record<string, MessageService<any, any>> = {}

    static create(): PsrMessenger {
        return PsrMessenger._rootMessenger = new PsrMessenger()
    }

    static defineMessage<
        T extends string = string,
        M extends PsrMessengerTypes.MessageOptions<T> = PsrMessengerTypes.MessageOptions<T>
    >(key: string, ...subscribers: PsrMessengerTypes.Subscriber<T, M>[]): MessageService<T, M> {
        const plugin = PsrMessenger.getMessenger()
        if (!plugin) {
            throw new Error("获取Messenger失败")
        }
        return plugin._messageServices[key] = new MessageService<T, M>().subscribe(...subscribers)
    }

    private static getMessenger(): PsrMessenger {
        return inject<PsrMessenger>(injectKey) || PsrMessenger._rootMessenger
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}