import {MessageService} from "./MessageService";
import {PsrLoggerTypes} from "../../types/PsrLoggerTypes";

const consoleOutSubscriber = (msgObj: PsrLoggerTypes.Log, options: PsrLoggerTypes.LogOptions): void => {
    if (options.console || options.debugging) {
        // 启用控制台输出或者调试模式，都会输出到控制台
        const {message, topic, owner, data} = msgObj
        let msg = message
        if (data) {
            msg += '\n- data:%o'
        }
        if (owner) {
            msg += `\n- owner: ${owner.method}\t@ ${owner.source}`
        }
        switch (topic) {
            case "info":
            case "success":
                console.info(msg, data)
                break
            case "debug":
                console.debug(msg, data)
                break
            case "warn":
                console.warn(msg, data)
                break
            case "error":
                console.error(msg, data)
                break
        }
    }
}

export class LogService<M extends PsrLoggerTypes.LogOptions> extends MessageService<PsrLoggerTypes.LogLevel, M> {
    private readonly _debugging: boolean
    private readonly optionsByLevel: (level: PsrLoggerTypes.LogLevel) => M

    constructor(debugging: boolean, optionsByLevel: (level: PsrLoggerTypes.LogLevel) => M) {
        super();
        this._debugging = debugging
        this.optionsByLevel = optionsByLevel
        this.subscribe(consoleOutSubscriber)
    }

    info(message: string, options?: M) {
        this.message(message, {
            ...this.optionsByLevel('info'),
            ...options,
            topic: 'info',
            debugging: this._debugging
        })
    }

    success(message: string, options?: M) {
        this.message(message, {
            ...this.optionsByLevel('success'),
            ...options,
            topic: 'success',
            debugging: this._debugging
        })
    }

    warn(message: string, options?: M) {
        this.message(message, {
            ...this.optionsByLevel('warn'),
            ...options,
            topic: 'warn',
            debugging: this._debugging
        })
    }

    error(message: string, options?: M) {
        this.message(message, {
            ...this.optionsByLevel('error'),
            ...options,
            topic: 'error',
            debugging: this._debugging
        })
    }

    debug(message: string, options?: M) {
        if (this._debugging) {
            this.message(message, {
                ...options,
                ...this.optionsByLevel('debug'),
                topic: 'debug',
                debugging: this._debugging
            })
        }
    }
}