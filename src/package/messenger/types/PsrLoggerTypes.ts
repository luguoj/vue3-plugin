import {PsrMessengerTypes} from "./PsrMessengerTypes";
import {LogService as _LogService} from "../services/message/LogService";

export namespace PsrLoggerTypes {
    export type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug'

    export interface LogOptions extends PsrMessengerTypes.MessageOptions<LogLevel> {
        /**
         * 调试模式标识
         */
        debugging?: boolean
        /**
         * 输出到控制台
         */
        console?: boolean | any
        /**
         * 记录日志
         */
        log?: boolean | any
        /**
         * 用户反馈
         */
        feedback?: boolean | any
        /**
         * 显示提醒（用于系统主动推送）
         */
        notify?: boolean | any
    }

    export type Log = PsrMessengerTypes.Message<LogLevel>

    export interface Subscriber<M extends LogOptions> {
        (msgObj: Log, options: M): void
    }

    export class LogService<M extends LogOptions> extends _LogService<M> {
    }
}