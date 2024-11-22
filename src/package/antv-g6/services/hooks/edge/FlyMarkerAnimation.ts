import {BaseEdge, ElementHooks, subStyleProps} from "@antv/g6";
import {Circle, CircleStyleProps} from '@antv/g';
import {DisplayObject, IAnimation} from "@antv/g-lite";
import {ElementHooksBuilder} from "../../wrapElementCtorWithHooks.ts";

export interface MarkerShapeOptions<M extends DisplayObject> {
    /** marker形状类型 */
    type: string | { new(...args: any[]): M },
    /** marker对象样式属性 */
    attributes: M['attributes'],
}

/**
 * 飞行marker动画选项
 */
export interface FlyMarkerAnimationOptions<M extends DisplayObject> {
    /** 状态关键字 */
    stateKey: string
    /** marker对象关键字，同时作为marker对象样式属性前缀 */
    markerKey: string
    shape?: MarkerShapeOptions<M>
    /** 动画关键帧 */
    keyframes?: Keyframe[] | PropertyIndexedKeyframes
    /** 动画选项 */
    options?: number | KeyframeAnimationOptions
}

export function useFlyMarkerAnimation<M extends DisplayObject>(
    aniOptions: FlyMarkerAnimationOptions<M>
): ElementHooksBuilder {
    const {stateKey, markerKey, shape: {type, attributes}, keyframes, options} = {
        shape: {
            type: Circle,
            attributes: {
                r: 10,
                fill: '#c3d5f9'
            } as CircleStyleProps
        } as unknown as MarkerShapeOptions<M>,
        keyframes: [
            {offsetDistance: 0},
            {offsetDistance: 1},
        ],
        options: {
            duration: 3000,
            iterations: Infinity
        },
        ...aniOptions
    }
    return () => {
        let marker: M | null = null
        let animation: IAnimation | null = null
        const hooks: ElementHooks = {
            onCreate(this: BaseEdge) {
                const markerStyle = {
                    ...attributes,
                    offsetPath: this.shapeMap.key, // 附加移动路径
                    ...subStyleProps(this.attributes, markerKey) // 附加其他样式属性
                }
                marker = this.upsert(
                    markerKey,
                    type,
                    markerStyle,
                    this
                )!
                marker.setAttribute('visibility', 'hidden')
                animation = marker.animate(keyframes, options)
                animation?.pause()
            },
            onUpdate(this: BaseEdge) {
                // 更新marker属性
                const markerStyle = {
                    ...attributes,
                    offsetPath: this.shapeMap.key, // 附加移动路径
                    ...subStyleProps(this.attributes, markerKey) // 附加其他样式属性
                }
                for (const markerStyleKey in markerStyle) {
                    marker?.setAttribute(markerStyleKey, markerStyle[markerStyleKey])
                }
                const runningState = this.getAttribute(stateKey as any)
                if (runningState) {
                    marker?.setAttribute('visibility', 'visible')
                    animation?.play()
                } else {
                    marker?.setAttribute('visibility', 'hidden')
                    animation?.cancel()
                }
            },
            onDestroy(this: BaseEdge) {
                animation?.cancel()
                this.upsert(markerKey, type, false, this)
            },
        }
        return hooks
    }
}