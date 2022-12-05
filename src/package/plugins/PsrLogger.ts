import {PsrMessengerTypes} from "../types/PsrMessengerTypes";
import {LogService} from "../services/message/LogService";
import {App, getCurrentInstance, inject} from "vue";
import {PsrLoggerTypes} from "../types/PsrLoggerTypes";

const injectKey = 'psr-logger'

export class PsrLogger {
    private static _activeInstance: PsrLogger
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
        return PsrLogger._activeInstance = new PsrLogger(debugging, optionsByLevel, subscribers)
    }

    static setActive(logger: PsrLogger) {
        PsrLogger._activeInstance = logger
    }

    public static useLog(): LogService<any> {
        return PsrLogger.getInstance()._logServices
    }

    private static getInstance(): PsrLogger {
        if (getCurrentInstance())
            return inject<PsrLogger>(injectKey) || PsrLogger._activeInstance
        else return PsrLogger._activeInstance
    }


    install(app: App) {
        app.provide(injectKey, this)
    }
}