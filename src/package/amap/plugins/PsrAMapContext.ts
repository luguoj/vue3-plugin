import {PsrAMapTypes} from "../types/PsrAMapTypes.ts";
import {App, getCurrentInstance, inject, onMounted, Ref, shallowRef, ShallowRef, watch} from "vue";
import {useMap} from "../services/useMap.ts";

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
        initOptionsRef: Ref<PsrAMapTypes.MapInitOptions>,
        options?: PsrAMapTypes.MapOptions | (() => PsrAMapTypes.MapOptions)
    ): ShallowRef<AMap.Map | undefined> {
        return useMap(PsrAMapContext.getInstance().ready().then(AMap => AMap.Map), containerDivRef, initOptionsRef, options)
    }

    public static usePlugin<P>(
        pluginName: PsrAMapTypes.PluginName,
    ): Promise<P> {
        return PsrAMapContext.getInstance().ready().then((AMap) => {
            return new Promise(resolve => AMap.plugin(`AMap.${pluginName}`, () => {
                resolve(AMap[pluginName])
            }))
        })
    }

    public static useInfoWindow(
        initOptions?: AMap.InfoWindow.Options
    ) {
        const infoWindow = shallowRef<AMap.InfoWindow>()
        PsrAMapContext.getInstance().ready().then(AMap => {
            infoWindow.value = new AMap.InfoWindow(initOptions)
        })
        return infoWindow
    }

    public static useMarker(
        initOptions?: AMap.Marker.Options
    ) {
        const marker = shallowRef<AMap.Marker>()
        PsrAMapContext.getInstance().ready().then(AMap => {
            marker.value = new AMap.Marker(initOptions)
        })
        return marker
    }

    public static useBuildings(
        initOptions?: AMap.Buildings.Options
    ) {
        const buildings = shallowRef<AMap.Buildings>()
        PsrAMapContext.getInstance().ready().then(AMap => {
            buildings.value = new AMap.Buildings(initOptions)
        })
        // 组件卸载时销毁图层实例
        onUnmounted(() => {
            buildings.value?.destroy()
        })
        return buildings
    }

    public static useMarkerCluster(
        initOptions?: {
            map?: AMap.Map,
            dataOptions?: AMap.MarkerCluster.DataOptions[],
            opts?: AMap.MarkerCluster.Options
        }
    ) {
        const markerCluster = shallowRef<AMap.MarkerCluster>()
        PsrAMapContext.usePlugin<typeof AMap.MarkerCluster>("MarkerCluster").then(
            AMapMarkerCluster => {
                markerCluster.value = new AMapMarkerCluster(initOptions?.map as any, initOptions?.dataOptions || [], initOptions?.opts)
            }
        )
        return markerCluster
    }

    public static usePixel(pixelRef: Ref<PsrAMapTypes.Pixel | undefined>) {
        const aMapPixelRef = shallowRef<AMap.Pixel>()
        PsrAMapContext.getInstance().ready().then(AMap => {
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