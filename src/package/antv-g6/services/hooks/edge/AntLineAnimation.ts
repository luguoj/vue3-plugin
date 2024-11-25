import {BaseEdge, ElementHooks} from "@antv/g6";
import {IAnimation} from "@antv/g-lite";
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
        let animation: IAnimation | null = null
        const hooks: ElementHooks = {
            onCreate(this: BaseEdge) {
                animation = this.getShape('key').animate(keyframes, options)!
                animation?.pause()
            },
            onUpdate(this: BaseEdge) {
                const runningState = this.getAttribute(stateKey as any)
                if (runningState) {
                    this.getShape('key').setAttribute('lineDash', lineDash)
                    animation?.play()
                } else {
                    animation?.pause()
                }
            },
            onDestroy() {
                animation?.cancel()
            },
        }
        return hooks
    }
}