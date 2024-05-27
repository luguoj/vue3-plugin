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

    // 地图选项
    export type MapOptions = {
        viewMode?: '2D' | '3D'
    } | undefined

    // 经纬度坐标
    export type LngLat = {
        lng: number // 经度
        lat: number // 维度
    }

    export type Anchor = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

    export type Pixel = {
        x: number
        y: number
        round?: boolean
    }
}