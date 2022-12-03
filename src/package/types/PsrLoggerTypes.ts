import {PsrMessengerTypes} from "./PsrMessengerTypes";
import {LogService as _LogService} from "../services/message/LogService";

export namespace PsrLoggerTypes {
    export type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug'

    export interface LogOptions extends PsrMessengerTypes.MessageOptions<LogLevel> {
        debugging?: boolean
        console?: boolean
    }

    export type Log = PsrMessengerTypes.Message<LogLevel>

    export interface Subscriber<M extends LogOptions> {
        (msgObj: Log, options: M): void
    }

    export class LogService<M extends LogOptions> extends _LogService<M> {
    }
}