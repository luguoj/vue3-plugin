import {BaseEdge, ElementHooks} from "@antv/g6";
import {IAnimation} from "@antv/g-lite";

export interface AntLineAnimationOptions {
    stateKey: string
    lineDash?: string | number | (string | number)[]
    keyframes?: Keyframe[] | PropertyIndexedKeyframes
    options?: number | KeyframeAnimationOptions
}

function useHooks(
    aniOptions: AntLineAnimationOptions
) {
    const {stateKey, lineDash, keyframes, options} = {
        lineDash: [10, 10],
        keyframes: [
            {lineDashOffset: 0},
            {lineDashOffset: -20},
        ],
        options: {
            duration: 500,
            iterations: Infinity
        },
        ...aniOptions
    }
    let animation: IAnimation | null = null
    const hooks: ElementHooks = {
        onCreate(this: BaseEdge) {
            animation = this.getShape('key').animate(keyframes, options)
            animation?.pause()
        },
        onUpdate(this: BaseEdge) {
            const runningState = this.getAttribute(stateKey as any)
            if (runningState) {
                this.setAttribute('lineDash', lineDash)
                animation?.play()
            } else {
                this.setAttribute('lineDash', undefined)
                animation?.pause()
            }
        },
        onDestroy() {
            animation?.cancel()
        },
    }
    return hooks
}

export const AntLineAnimation = {
    useHooks,
}