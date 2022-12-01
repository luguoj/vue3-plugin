import {MessageService as MessageServiceImpl} from "../services/message/MessageService";

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
        toast?: boolean
        notify?: boolean
        console?: boolean
        log?: boolean
    }

    export interface LogService {
        (message: Message): Promise<boolean>
    }

    export type MessageService = MessageServiceImpl
}