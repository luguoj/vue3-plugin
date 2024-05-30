import {onUnmounted, shallowRef} from "vue";

export function useGLCustomLayer(
    GLCustomLayerConstructor: typeof AMap.GLCustomLayer | Promise<typeof AMap.GLCustomLayer>,
    options?: AMap.GLCustomLayer.Options | (() => AMap.GLCustomLayer.Options)
) {
    const customLayerRef = shallowRef<AMap.GLCustomLayer>()
    const layerOptions: any =
        typeof options === 'function'
            ? {...options()}
            : {...options}
    if (GLCustomLayerConstructor instanceof Promise) {
        GLCustomLayerConstructor.then(GLCustomLayer => {
            customLayerRef.value = new GLCustomLayer(layerOptions)
        })
    } else {
        customLayerRef.value = new GLCustomLayerConstructor(layerOptions)
    }
    // 组件卸载时销毁图层实例
    onUnmounted(() => {
        customLayerRef.value?.setMap()
        customLayerRef.value?.destroy()
    })
    return customLayerRef
}