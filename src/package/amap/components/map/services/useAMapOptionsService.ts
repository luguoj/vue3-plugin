import {ShallowRef, watchEffect} from "vue";

export function useAMapOptionsService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{  // 地图是否展示地形
        // 地图上显示的元素种类
        mapFeatures: AMap.Map.Feature[]
        // 地图显示的缩放级别范围
        mapZoomRange: [number, number]
        // 地图是否可通过鼠标拖拽平移
        mapDragEnable: boolean
        // 地图是否可缩放
        mapZoomEnable: boolean
        // 地图是否使用缓动效果
        mapJogEnable: boolean
        // 是否允许设置俯仰角度
        mapPitchEnable: boolean
        // 地图是否可旋转
        mapRotateEnable: boolean
        // 地图平移过程中是否使用动画
        mapAnimateEnable: boolean
        // 地图是否可通过键盘控制
        mapKeyboardEnable: boolean
        // 地图是否可通过双击鼠标放大地图
        mapDoubleClickZoom: boolean
        // 地图是否可通过鼠标滚轮缩放浏览
        mapScrollWheel: boolean
        // 地图在移动终端上是否可通过多点触控缩放浏览地图
        mapTouchZoom: boolean
        // 是否展示地图文字和 POI 信息
        mapShowLabel: boolean
        // 地图默认鼠标样式
        mapDefaultCursor?: string
        // 是否开启地图热点和标注的 hover 效果
        mapIsHotspot: boolean
        // 设置地图的显示样式
        mapStyle?: string
        // 文字是否拒绝掩模图层进行掩模
        mapLabelRejectMask: boolean
        // 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像
        // 一维数组时代表一个普通多边形路径
        // 二维数组时代表一个带洞的多边形路径
        // 三维数组时代表多个多边形路径
        mapMask?: [number, number][] | [number, number][][] | [number, number][][][]
    }>
) {
    watchEffect(()=>{
        const map = mapRef.value as any
        if (map) {
            map.setFeatures(props.mapFeatures)
            map.setZooms(props.mapZoomRange)
            map.setStatus({
                dragEnable: props.mapDragEnable,
                zoomEnable: props.mapZoomEnable,
                jogEnable: props.mapJogEnable,
                pitchEnable: props.mapPitchEnable,
                rotateEnable: props.mapRotateEnable,
                animateEnable: props.mapAnimateEnable,
                keyboardEnable: props.mapKeyboardEnable,
                doubleClickZoom: props.mapDoubleClickZoom,
                scrollWheel: props.mapScrollWheel,
                touchZoom: props.mapTouchZoom,
                isHotspot: props.mapIsHotspot,
            })
            map.set('showLabel', props.mapShowLabel)
            map.setDefaultCursor(props.mapDefaultCursor)
            map.setMapStyle(props.mapStyle)
            map.setLabelRejectMask(props.mapLabelRejectMask)
            map.setMask(props.mapMask)
        }
    })
}