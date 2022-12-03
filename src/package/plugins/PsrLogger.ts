import {PsrMessengerTypes} from "../types/PsrMessengerTypes";
import {LogService} from "../services/message/LogService";
import {App, inject} from "vue";
import {PsrLoggerTypes} from "../types/PsrLoggerTypes";

const injectKey = Symbol('logger')

export class PsrLogger {
    private static _rootInstance: PsrLogger
    private readonly _logServices: LogService<any>

    private constructor(
        debugging: boolean,
        optionsByLevel: (level: PsrLoggerTypes.LogLevel) => any,
        subscribers: PsrMessengerTypes.Subscriber<any, any>[]
    ) {
        this._logServices = new LogService<any>(
            debugging,
            optionsByLevel
        ).subscribe(...subscribers)
    }

    static create(
        {
            debugging = false,
            optionsByLevel = () => ({}),
            subscribers = []
        }: {
            debugging?: boolean
            optionsByLevel?: (level: PsrLoggerTypes.LogLevel) => any
            subscribers?: PsrMessengerTypes.Subscriber<any, any>[]
        }
    ): PsrLogger {
        return PsrLogger._rootInstance = new PsrLogger(debugging, optionsByLevel, subscribers)
    }

    public static useLog(): LogService<any> {
        return PsrLogger.getLogger()._logServices
    }

    private static getLogger(): PsrLogger {
        return inject<PsrLogger>(injectKey) || PsrLogger._rootInstance
    }


    install(app: App) {
        app.provide(injectKey, this)
    }
}