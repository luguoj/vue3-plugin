import {registerNode} from "@antv/g6";
import {PsrAntvG6Types} from "../../types";
import {AnimationHandler} from "../utils/AnimationHandler.ts";
import {Item} from "@antv/g6-core/lib/types";
import {buildCircleAnimation} from "./buildCircleAnimation.ts";

export function useCircleWithAnimation(options: {
    id: number,
    animations: {
        type: PsrAntvG6Types.CircleAnimationType,
        cfg?: any
    }[]
}) {
    const {id, animations} = options
    const name = 'psr-circle-with-animation-' + id
    const hAnis: AnimationHandler<any>[] = animations.map(({type, cfg}) => buildCircleAnimation<any>({type, cfg}))
    registerNode(name,
        {
            afterDraw(cfg, group, rst) {
                for (const hAni of hAnis) {
                    hAni.init(this, cfg, group, rst)
                }
            },
            setState(name?: string, value?: string | boolean, item?: Item) {
                for (const hAni of hAnis) {
                    if (hAni.type === name && item) {
                        hAni.onStateChanged(item, !!value)
                    }
                }
            }
        },
        'circle',
    );
    return name
}