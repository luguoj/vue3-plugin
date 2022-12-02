import {MessageService as AbstractMessageService} from "../services/message/MessageService";

export namespace PsrPortalMessageTypes {
    export type MessageLevel = 'info' | 'success' | 'warn' | 'error' | 'debug'

    export interface MessageOwner {
        method: string
        source: string
    }

    export interface Message {
        time: Date,
        owner?: MessageOwner,
        message: string,
        data?: any
        level: MessageLevel
    }

    export interface MessageOptions {
        data?: any
        console?: boolean
    }

    export interface LogService {
        (message: Message): Promise<boolean>
    }

    export abstract class MessageService<M extends MessageOptions> extends AbstractMessageService<M> {
    }
}