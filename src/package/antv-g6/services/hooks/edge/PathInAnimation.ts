import {BaseEdge, ElementHooks} from "@antv/g6";
import {Path} from "@antv/g";
import {ElementHooksBuilder} from "../../wrapElementCtorWithHooks.ts";

export interface PathInAnimationOptions {
    options?: EffectTiming
}

export function usePathInAnimation(
    aniOptions: PathInAnimationOptions
): ElementHooksBuilder {
    const {options} = {
        options: {
            duration: 500,
            fill: 'both'
        } as EffectTiming,
        ...aniOptions
    }
    return () => {
        const hooks: ElementHooks = {
            onCreate(this: BaseEdge) {
                const shape: Path = this.getShape('key')
                const length: number = shape.getTotalLength()
                shape.animate(
                    [
                        {lineDash: [0, length]},
                        {lineDash: [length, 0]}
                    ] as any,
                    options
                )
            }
        }
        return hooks
    }
}