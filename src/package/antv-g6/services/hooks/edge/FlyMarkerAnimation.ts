import {BaseEdge, ElementHooks, subStyleProps} from "@antv/g6";
import {Circle, CircleStyleProps, Group} from '@antv/g';
import {DisplayObject, IAnimation} from "@antv/g-lite";
import {ElementHooksBuilder} from "../../wrapElementCtorWithHooks.ts";

export interface MarkerShapeOptions<M extends DisplayObject> {
    /** marker形状类型 */
    type: { new(...args: any[]): M },
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
    /** 动画选项 */
    options?: EffectTiming
}

export function useFlyMarkerAnimation<M extends DisplayObject>(
    aniOptions: FlyMarkerAnimationOptions<M>
): ElementHooksBuilder {
    const keyframes: Keyframe[] = [
        {offsetDistance: 0},
        {offsetDistance: 1},
    ]
    const {stateKey, markerKey, shape: {type, attributes}, options} = {
        shape: {
            type: Circle,
            attributes: {
                r: 10,
                fill: '#c3d5f9'
            } as CircleStyleProps
        } as unknown as MarkerShapeOptions<M>,
        options: {
            duration: 3000,
            iterations: Infinity
        },
        ...aniOptions
    }
    return () => {
        const group: Group = new Group()
        let marker: M | null = null
        let animation: IAnimation | null = null
        const hooks: ElementHooks = {
            onCreate(this: BaseEdge) {
                this.appendChild(group)
                const markerStyle = {
                    ...attributes,
                    offsetPath: this.shapeMap.key, // 附加移动路径
                    ...subStyleProps(this.attributes, markerKey) // 附加其他样式属性
                }
                marker = new type(markerStyle)
                group.appendChild(marker)
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
                    group.forEach((shape: any) => {shape.setAttribute('visibility','visible')})
                    animation?.play()
                } else {
                    group.forEach((shape: any) => {shape.setAttribute('visibility','hidden')})
                    animation?.cancel()
                }
            },
            onDestroy(this: BaseEdge) {
                group.remove()
                group.destroy()
            },
        }
        return hooks
    }
}