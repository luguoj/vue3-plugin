import * as THREEJS from "three162";

export namespace PsrAMapTypes {
    // 插件选项
    export interface Options {
        key: string; // 申请好的Web端开发者Key，首次调用 load 时必填
        version: string; // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins?: string[]; //插件列表
        // 是否加载 AMapUI，缺省不加载
        AMapUI?: {
            version?: string; // AMapUI 缺省 1.1
            plugins?: string[]; // 需要加载的 AMapUI ui插件
        };
        // 是否加载 Loca， 缺省不加载
        Loca?: {
            version?: string; // Loca 版本，缺省 1.3.2
        };
    }

    export type PluginName =
        "ElasticMarker"
        | "ToolBar"
        | "Scale"
        | "HawkEye"
        | "ControlBar"
        | "MapType"
        | "Geolocation"
        | "AutoComplete"
        | "PlaceSearch"
        | "DistrictSearch"
        | "LineSearch"
        | "StationSearch"
        | "Driving"
        | "TruckDriving"
        | "Transfer"
        | "Walking"
        | "Riding"
        | "DragRoute"
        | "Geocoder"
        | "CitySearch"
        | "IndoorMap"
        | "MouseTool"
        | "CircleEditor"
        | "PolygonEditor"
        | "PolylineEditor"
        | "RectangleEditor"
        | "EllipseEditor"
        | "BezierCurveEditor"
        | "MarkerCluster"
        | "RangingTool"
        | "CloudDataSearch"
        | "Weather"


    // 地图选项
    export type MapInitOptions = {
        viewMode?: '2D' | '3D'
        terrain?: boolean
        touchZoomCenter?: number
        wallColor?: string | number[]
        roofColor?: string | number[]
        showBuildingBlock?: boolean
        showIndoorMap?: boolean
        skyColor?: string | number[]
    } | undefined

    export type MapOptions = Omit<
        AMap.Map.Options,
        'viewMode'
        | 'terrain'
        | 'touchZoomCenter'
        | 'wallColor'
        | 'roofColor'
        | 'showBuildingBlock'
        | 'showIndoorMap'
        | 'skyColor'
    >

    export interface ClusterMarkerData<T = void> {
        // 经纬度坐标
        position: LngLat
        // 权重
        weight?: number
        // 数据
        data?: T
    }

    // 经纬度坐标
    export interface LngLat {
        lng: number // 经度
        lat: number // 维度
    }

    export type Anchor =
        'top-left'
        | 'top-center'
        | 'top-right'
        | 'middle-left'
        | 'center'
        | 'middle-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right'

    export interface Pixel {
        x: number
        y: number
        round?: boolean
    }

    export interface Size {
        width: number,
        height: number
    }

    export interface Icon {
        image: string // 图标取图地址
        size: Size // 图标尺寸
        offset: Pixel // 在大图中截取图标的偏移量
        imageSize: Size // 图标所用图片的尺寸

    }

    export namespace ThreeJsLayer {
        export interface OnReadyParams {
            amap: AMap.Map
            customCoords: () => AMap.Map.CustomCoords
            renderContext: RenderContext
            render: () => void
            THREE: typeof THREEJS
        }

        export interface RenderContext {
            renderer: THREEJS.WebGLRenderer
            camera: THREEJS.PerspectiveCamera | THREEJS.OrthographicCamera
            scene: THREEJS.Scene
        }

        export type OnReadyHandler = (params: OnReadyParams) => void
    }
}