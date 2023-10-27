import {App, getCurrentInstance, inject} from "vue";
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
        return PsrMessenger.getInstance()._messageServices[key] = new MessageService<T, M>().subscribe(...subscribers)
    }

    static useMessage<
        T extends string = string,
        M extends PsrMessengerTypes.MessageOptions<T> = PsrMessengerTypes.MessageOptions<T>
    >(key: string): MessageService<T, M> {
        return PsrMessenger.getInstance()._messageServices[key]
    }

    private static getInstance(): PsrMessenger {
        if (getCurrentInstance())
            return inject<PsrMessenger>(injectKey) || PsrMessenger._activeInstance
        else return PsrMessenger._activeInstance
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}