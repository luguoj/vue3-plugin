import {BaseEdge, ElementHooks} from "@antv/g6";
import {DisplayObject} from "@antv/g-lite";
import {ElementHooksBuilder} from "../../wrapElementCtorWithHooks.ts";
import {Keyframe} from "@antv/g6/lib/types";

export interface AntLineAnimationOptions {
    stateKey: string
    lineDash?: number[]
    options?: EffectTiming
}

export function useAntLineAnimation(
    aniOptions: AntLineAnimationOptions
): ElementHooksBuilder {
    const {stateKey, lineDash, options} = {
        lineDash: [10, 10],
        options: {
            duration: 500,
            iterations: Infinity
        } as EffectTiming,
        ...aniOptions
    }
    return () => {
        const keyframes: Keyframe[] = [
            {lineDashOffset: 0},
            {lineDashOffset: lineDash.reduce((a, b) => -(a + b))}
        ]
        let antLine: DisplayObject | null = null
        const hooks: ElementHooks = {
            onCreate(this: BaseEdge) {
                antLine = this.getShape('key').cloneNode(true)
                antLine.setAttribute('lineDash', lineDash)
                antLine.setAttribute('visibility', 'hidden')
                this.appendChild(antLine)
                antLine.animate(keyframes, options)
            },
            onUpdate(this: BaseEdge) {
                if (antLine) {
                    for (const attKey in this.getShape('key').attributes) {
                        antLine.setAttribute(attKey, this.getShape('key').getAttribute(attKey))
                    }
                    antLine.setAttribute('lineDash', lineDash)
                }
                const runningState = this.getAttribute(stateKey as any)
                if (runningState) {
                    this.getShape('key').setAttribute('visibility', 'hidden')
                    antLine?.setAttribute('visibility', 'visible')
                } else {
                    this.getShape('key').setAttribute('visibility', 'visible')
                    antLine?.setAttribute('visibility', 'hidden')
                }
            },
            onDestroy() {
                antLine?.remove()
                antLine?.destroy()
            },
        }
        return hooks
    }
}