import {BaseNode, ElementHooks} from "@antv/g6";
import {IAnimation} from "@antv/g-lite";

export interface BreathingAnimationOptions {
    stateKey: string
    keyframes?: Keyframe[] | PropertyIndexedKeyframes
    options?: number | KeyframeAnimationOptions
}

function useHooks(
    aniOptions: BreathingAnimationOptions
) {
    const {stateKey, keyframes, options} = {
        keyframes: [{lineWidth: 0}, {lineWidth: 20}],
        options: {
            duration: 1000,
            iterations: Infinity,
            direction: 'alternate'
        } as KeyframeAnimationOptions,
        ...aniOptions
    }
    let animation: IAnimation | null = null
    const hooks: ElementHooks = {
        onCreate(this: BaseNode) {
            animation = this.shapeMap.halo.animate(keyframes, options)
            animation?.cancel()
        },
        onUpdate(this: BaseNode) {
            const runningState = this.getAttribute(stateKey as any)
            if (runningState) {
                animation?.play()
            } else {
                animation?.cancel()
            }
        },
        onDestroy() {
            animation?.cancel()
        },
    }
    return hooks
}

export const BreathingAnimation = {
    useHooks,
}