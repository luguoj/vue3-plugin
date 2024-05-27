import {PsrAMapTypes} from "../types/PsrAMapTypes.ts";
import {App, getCurrentInstance, inject, onMounted, Ref, shallowRef, ShallowRef, watch} from "vue";
import {useMap} from "../services/useMap.ts";
import {useInfoWindow} from "../services/useInfoWindow.ts";
import {useMarker} from "../services/useMarker.ts";

const injectKey = 'psr-a-map'

export class PsrAMapContext {
    private static _activeInstance: PsrAMapContext
    private readonly _options: PsrAMapTypes.Options
    private _ready: Promise<any> | undefined

    ready(): Promise<any> {
        if (!this._ready) {
            this._ready = new Promise((resolve) => {
                // 必须要在onMounted 中调用，否则会导致SSR构建时抛出异常
                onMounted(() => {
                    import("@amap/amap-jsapi-loader")
                        .then((AMapLoader) => {
                            resolve(AMapLoader.load(this._options))
                        })
                })
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

    public static useInfoWindow(
        initOptions?: AMap.InfoWindow.Options | (() => AMap.InfoWindow.Options)
    ) {
        return useInfoWindow(PsrAMapContext.getInstance(), initOptions)
    }

    public static useMarker(
        initOptions?: AMap.Marker.Options | (() => AMap.Marker.Options)
    ) {
        return useMarker(PsrAMapContext.getInstance(), initOptions)
    }

    public static usePixel(pixelRef: Ref<PsrAMapTypes.Pixel | undefined>) {
        const aMapPixelRef = shallowRef<AMap.Pixel>()
        this.getInstance().ready().then((AMap) => {
            watch(pixelRef, pixel => {
                aMapPixelRef.value = pixel ? new AMap.Pixel(pixel.x, pixel.y, pixel.round) : undefined
            }, {immediate: true, deep: true})
        })
        return aMapPixelRef
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}