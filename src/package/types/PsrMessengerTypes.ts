import {MessageService as _MessageService} from "../services/message/MessageService";

export namespace PsrMessengerTypes {
    export interface MessageOwner {
        method: string
        source: string
    }

    export interface Message<T extends string> {
        time: Date,
        owner?: MessageOwner,
        message: string,
        data?: any
        topic?: T
    }

    export interface MessageOptions<T extends string> {
        topic?: T
        data?: any
    }

    export interface Subscriber<T extends string, M extends MessageOptions<T>> {
        (msgObj: PsrMessengerTypes.Message<T>, options: M): void
    }

    export class MessageService<T extends string, M extends MessageOptions<T>> extends _MessageService<T, M> {
    }

}