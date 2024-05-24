import {PsrAMapTypes} from "../types/PsrAMapTypes.ts";
import {App, getCurrentInstance, inject, Ref, ShallowRef} from "vue";
import {useMap} from "../services/useMap.ts";

const injectKey = 'psr-a-map'

export class PsrAMapContext {
    private static _activeInstance: PsrAMapContext
    private readonly _options: PsrAMapTypes.Options
    private _ready: Promise<any> | undefined

    ready() {
        if (!this._ready) {
            this._ready = import("@amap/amap-jsapi-loader")
                .then((AMapLoader) => {
                    return AMapLoader.load(this._options)
                })
        }
        return this._ready
    }

    private constructor(options: PsrAMapTypes.Options) {
        this._options = options
    }

    static create(options: PsrAMapTypes.Options) {
        return PsrAMapContext._activeInstance = new PsrAMapContext(options)
    }

    static setActive(appContext: PsrAMapContext) {
        PsrAMapContext._activeInstance = appContext
    }

    private static getInstance(): PsrAMapContext {
        if (getCurrentInstance())
            return inject<PsrAMapContext>(injectKey) || PsrAMapContext._activeInstance
        else return PsrAMapContext._activeInstance
    }

    public static useMap(
        containerDivRef: ShallowRef<HTMLDivElement | undefined>,
        optionsRef: Ref<PsrAMapTypes.MapOptions>,
        initOptions?: Omit<AMap.Map.Options, "viewMode"> | (() => Omit<AMap.Map.Options, "viewMode">)
    ): ShallowRef<AMap.Map | undefined> {
        return useMap(PsrAMapContext.getInstance(), containerDivRef, optionsRef, initOptions)
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}