import {App, inject} from "vue";
import {MessageService} from "../services/message/MessageService";
import {PsrMessengerTypes} from "../types/PsrMessengerTypes";

const injectKey = 'psr-messenger'

export class PsrMessenger {
    private static _activeInstance: PsrMessenger
    private readonly _messageServices: Record<string, MessageService<any, any>> = {}

    static create(): PsrMessenger {
        return PsrMessenger._activeInstance = new PsrMessenger()
    }

    static setActive(messenger: PsrMessenger) {
        PsrMessenger._activeInstance = messenger
    }

    static defineMessage<
        T extends string = string,
        M extends PsrMessengerTypes.MessageOptions<T> = PsrMessengerTypes.MessageOptions<T>
    >(key: string, ...subscribers: PsrMessengerTypes.Subscriber<T, M>[]): MessageService<T, M> {
        return PsrMessenger.getMessenger()._messageServices[key] = new MessageService<T, M>().subscribe(...subscribers)
    }

    static useMessage<
        T extends string = string,
        M extends PsrMessengerTypes.MessageOptions<T> = PsrMessengerTypes.MessageOptions<T>
    >(key: string) {
        return PsrMessenger.getMessenger()._messageServices[key]
    }

    private static getMessenger(): PsrMessenger {
        return inject<PsrMessenger>(injectKey) || PsrMessenger._activeInstance
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}